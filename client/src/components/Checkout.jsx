import React, { useState } from 'react';

export default function Checkout({ cart, onCheckout, onCancel }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.1;
  const finalTotal = total + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerEmail) {
      alert('Please fill in all fields');
      return;
    }

    const orderData = {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      items: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice: finalTotal,
    };

    onCheckout(orderData);
  };

  return (
    <div className="checkout-container">
      <h2 className="section-title">Checkout</h2>
      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Billing Information</h3>
          <div className="form-group">
            <label htmlFor="customerName">Full Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerEmail">Email Address</label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <h3 style={{ marginTop: '2rem' }}>Order Review</h3>
          <div className="checkout-review">
            {cart.map(item => (
              <div key={item._id} className="review-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="checkout-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="checkout-buttons">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Back to Cart
            </button>
            <button type="submit" className="btn-place-order">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
