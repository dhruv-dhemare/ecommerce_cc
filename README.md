# ShopHub - E-Commerce Application

A modern, minimal MERN stack e-commerce application built with React + Vite and Express.

## Features

- Browse products with beautiful UI
- Add products to cart
- Manage cart with quantity adjustments
- Checkout with customer information
- Order placement and simulation
- Responsive design
- Product ratings and stock indicators
- Good product images from Unsplash API

## Tech Stack

- **Frontend**: React 18, Vite, Axios
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Styling**: Pure CSS (no Tailwind)

## Project Structure

```
ecommerce/
├── server/
│   ├── server.js          # Express server
│   ├── seed.js            # Database seeding script
│   ├── package.json
│   ├── models/
│   │   ├── Product.js     # Product model
│   │   └── Order.js       # Order model
│   └── routes/
│       ├── products.js    # Product routes
│       └── orders.js      # Order routes
├── client/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx        # Main app component
│       ├── App.css        # Styling
│       ├── main.jsx
│       └── components/
│           ├── ProductList.jsx
│           ├── Cart.jsx
│           └── Checkout.jsx
└── package.json           # Root package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- npm

### Installation

1. **Clone/Navigate to project:**
```bash
cd ecommerce
```

2. **Install all dependencies:**
```bash
npm run install-all
```

### Running the Application

#### Option 1: Run Both Server and Client Together
```bash
npm run dev
```

#### Option 2: Run Separately
**Terminal 1 - Server:**
```bash
npm run server
```

**Terminal 2 - Client:**
```bash
npm run client
```

### Database Setup

1. **Make sure MongoDB is running** (locally or on cloud)

2. **Seed the database with sample products:**
```bash
npm run seed
```

This will:
- Connect to MongoDB
- Clear existing products
- Insert 10 sample products with real Unsplash images

### Access the Application

- **Frontend**: http://localhost:5173 (Vite default port)
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID

## Features Walkthrough

### 1. Browse Products
- View all available products with images
- See product details, ratings, and prices
- Out of stock indicators

### 2. Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- View order summary with calculations

### 3. Checkout
- Enter customer information
- Review order before placing
- Place order (simulated)
- Order confirmation with ID

## Styling Highlights

- **Modern Gradient UI**: Purple gradient header and buttons
- **Hover Effects**: Interactive product cards with scale animations
- **Responsive Grid**: Auto-responsive product layout
- **Clean Typography**: Organized information hierarchy
- **Color Scheme**: 
  - Primary: #667eea (Purple)
  - Secondary: #764ba2 (Dark Purple)
  - Accent: #ffc107 (Gold for ratings)

## Sample Products

The database includes 10 sample products:
- Wireless Headphones
- Smart Watch
- USB-C Cable
- Phone Case
- Laptop Stand
- Mechanical Keyboard
- Wireless Mouse
- Screen Protector
- Portable Charger
- Webcam HD

All products use real images from Unsplash for a professional look.

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGO_URI in `server/.env`
- Default: `mongodb://localhost:27017/ecommerce`

### Port Already in Use
- Server uses port 5000
- Client uses port 5173
- Change in respective `package.json` or config files

### Products Not Showing
- Run `npm run seed` to populate database
- Check server health: `http://localhost:5000/api/health`

## Future Enhancements

- User authentication
- Payment gateway integration
- Product filters and search
- Order history
- Product reviews
- Admin dashboard
- Inventory management

## License

MIT License
