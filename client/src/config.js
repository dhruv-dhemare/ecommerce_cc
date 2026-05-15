// API Configuration
// Support environment variables for flexible deployment

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
  ORDERS: `${API_BASE_URL}/orders`,
};

export default API_BASE_URL;
