import React from 'react';

export default function ProductList({ products, loading, onAddToCart }) {
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="loading">No products found</div>;
  }

  return (
    <div className="products-container">
      <h2 className="section-title">Featured Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-category">{product.category}</p>
              <p className="product-description">{product.description}</p>
              <div className="product-rating">
                {'★'.repeat(Math.floor(product.rating))} {product.rating.toFixed(1)}
              </div>
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button
                  className="btn-add-cart"
                  onClick={() => onAddToCart(product)}
                  disabled={product.stock <= 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
              {product.stock <= 3 && product.stock > 0 && (
                <p className="stock-warning">Only {product.stock} left!</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
