# API Configuration Guide

## Overview
The frontend now uses a centralized configuration system for API endpoints, making it easy to deploy to different environments without code changes.

## Setup

### Development
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. The default configuration points to `http://localhost:5000/api`

### Environment Variables
Create or modify `.env.local` with the appropriate `VITE_API_BASE_URL`:

**Local Development:**
```
VITE_API_BASE_URL=http://localhost:5000/api
```

**Staging:**
```
VITE_API_BASE_URL=https://api-staging.yourdomain.com/api
```

**Production:**
```
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

## How It Works

1. **config.js** - Centralized configuration file that:
   - Reads `VITE_API_BASE_URL` from environment variables
   - Defaults to `http://localhost:5000/api` if not set
   - Exports `API_ENDPOINTS` object with all API routes

2. **vite.config.js** - Updated to:
   - Support `VITE_API_PROXY_TARGET` for dev server proxy configuration
   - Allow easy customization of proxy target

3. **Components** - All API calls now use:
   ```javascript
   import { API_ENDPOINTS } from '../config';
   
   // Instead of: axios.get('/api/products')
   // Now use: axios.get(API_ENDPOINTS.PRODUCTS)
   ```

## Usage in Components

```javascript
import { API_ENDPOINTS } from '../config';
import axios from 'axios';

// Fetch products
const response = await axios.get(API_ENDPOINTS.PRODUCTS);

// Create order
const response = await axios.post(API_ENDPOINTS.ORDERS, orderData);

// Fetch orders
const response = await axios.get(API_ENDPOINTS.ORDERS);
```

## Adding New Endpoints

When adding new API endpoints:

1. Add the endpoint to `config.js`:
   ```javascript
   export const API_ENDPOINTS = {
     PRODUCTS: `${API_BASE_URL}/products`,
     ORDERS: `${API_BASE_URL}/orders`,
     USERS: `${API_BASE_URL}/users`,  // New endpoint
   };
   ```

2. Use it in your components:
   ```javascript
   const response = await axios.get(API_ENDPOINTS.USERS);
   ```

## Deployment Checklist

- [ ] Set appropriate `VITE_API_BASE_URL` for target environment
- [ ] Ensure backend is running and accessible from the specified URL
- [ ] Run `npm run build` to create production build
- [ ] Test API calls work with production URL before deploying

## Benefits

✓ **No hardcoded URLs** - Easy to change without code edits  
✓ **Environment-specific** - Different URLs per environment  
✓ **Centralized** - All endpoints in one place  
✓ **Scalable** - Easy to add new endpoints  
✓ **CI/CD Ready** - Environment variables work with deployment pipelines
