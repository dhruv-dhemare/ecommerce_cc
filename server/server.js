const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
console.log('MongoDB URI:', mongoUri.substring(0, 50) + '...');

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
}).then(() => console.log('✓ MongoDB connected successfully'))
  .catch(err => {
    console.error('✗ MongoDB connection error:', err.message);
    console.error('Make sure MongoDB is running and the connection string is correct');
  });

// Routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
