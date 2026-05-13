import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import './App.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('products'); // products, cart, checkout, orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item._id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const checkout = async (orderData) => {
    try {
      const response = await axios.post('/api/orders', orderData);
      alert('Order placed successfully! Order ID: ' + response.data._id);
      setCart([]);
      setView('products');
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order');
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">ShopHub</h1>
          <nav className="nav">
            <button
              className={`nav-btn ${view === 'products' ? 'active' : ''}`}
              onClick={() => setView('products')}
            >
              Shop
            </button>
            <button
              className={`nav-btn ${view === 'cart' ? 'active' : ''}`}
              onClick={() => setView('cart')}
            >
              Cart ({cart.length})
            </button>
            <button
              className={`nav-btn ${view === 'orders' ? 'active' : ''}`}
              onClick={() => setView('orders')}
            >
              Orders
            </button>
          </nav>
        </div>
      </header>

      <main className="main">
        {error && <div className="error">{error}</div>}
        
        {view === 'products' && (
          <ProductList
            products={products}
            loading={loading}
            onAddToCart={addToCart}
          />
        )}

        {view === 'cart' && cart.length > 0 && (
          <Cart
            cart={cart}
            onRemoveFromCart={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onCheckout={() => setView('checkout')}
          />
        )}

        {view === 'cart' && cart.length === 0 && (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <button className="btn-primary" onClick={() => setView('products')}>
              Continue Shopping
            </button>
          </div>
        )}

        {view === 'checkout' && (
          <Checkout
            cart={cart}
            onCheckout={checkout}
            onCancel={() => setView('cart')}
          />
        )}

        {view === 'orders' && (
          <OrderHistory />
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2024 ShopHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
