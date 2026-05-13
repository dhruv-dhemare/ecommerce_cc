const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

console.log('Connecting to MongoDB:', mongoUri);

const products = [
  {
    name: 'Wireless Headphones',
    price: 79.99,
    description: 'High-quality wireless headphones with noise cancellation',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    stock: 15,
    category: 'Electronics',
    rating: 4.5,
  },
  {
    name: 'Smart Watch',
    price: 199.99,
    description: 'Advanced fitness tracker and smartwatch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    stock: 10,
    category: 'Electronics',
    rating: 4.7,
  },
  {
    name: 'USB-C Cable',
    price: 12.99,
    description: 'Durable and fast charging USB-C cable',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop',
    stock: 50,
    category: 'Accessories',
    rating: 4.3,
  },
  {
    name: 'Phone Case',
    price: 19.99,
    description: 'Protective phone case with premium materials',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
    stock: 30,
    category: 'Accessories',
    rating: 4.6,
  },
  {
    name: 'Laptop Stand',
    price: 39.99,
    description: 'Adjustable aluminum laptop stand',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd231fc53f7?w=400&h=300&fit=crop',
    stock: 20,
    category: 'Accessories',
    rating: 4.4,
  },
  {
    name: 'Mechanical Keyboard',
    price: 129.99,
    description: 'RGB backlit mechanical keyboard with switches',
    image: 'https://images.unsplash.com/photo-1587829191301-46fb0bb88758?w=400&h=300&fit=crop',
    stock: 12,
    category: 'Electronics',
    rating: 4.8,
  },
  {
    name: 'Wireless Mouse',
    price: 49.99,
    description: 'Ergonomic wireless mouse with long battery life',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop',
    stock: 25,
    category: 'Electronics',
    rating: 4.5,
  },
  {
    name: 'Screen Protector',
    price: 9.99,
    description: 'Tempered glass screen protector for mobile devices',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf50b3e60?w=400&h=300&fit=crop',
    stock: 100,
    category: 'Accessories',
    rating: 4.2,
  },
  {
    name: 'Portable Charger',
    price: 34.99,
    description: 'Fast charging portable power bank',
    image: 'https://images.unsplash.com/photo-1609433927143-6694c54a9916?w=400&h=300&fit=crop',
    stock: 18,
    category: 'Electronics',
    rating: 4.6,
  },
  {
    name: 'Webcam HD',
    price: 59.99,
    description: '1080p HD webcam with auto-focus',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop',
    stock: 14,
    category: 'Electronics',
    rating: 4.4,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    console.log('✓ MongoDB connected');

    // Clear existing products
    await Product.deleteMany({});
    console.log('✓ Cleared existing products');

    // Insert products
    const result = await Product.insertMany(products);
    console.log(`✓ ${result.length} products added to database`);

    await mongoose.connection.close();
    console.log('✓ Database seeding completed successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();
