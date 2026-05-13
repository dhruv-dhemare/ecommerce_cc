import React from 'react';

export default function Cart({ cart, onRemoveFromCart, onUpdateQuantity, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 className="section-title">Shopping Cart</h2>
      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-quantity">
                <button onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}>−</button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item._id, parseInt(e.target.value) || 0)}
                  min="1"
                />
                <button onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              <div className="cart-item-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                className="btn-remove"
                onClick={() => onRemoveFromCart(item._id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row">
            <span>Tax:</span>
            <span>${(total * 0.1).toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${(total * 1.1).toFixed(2)}</span>
          </div>
          <button className="btn-checkout" onClick={onCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
