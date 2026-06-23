---
name: testing-product-store
description: Test the product store page end-to-end. Use when verifying product listing, cart sidebar, or shopping flow changes.
---

# Testing the Product Store

## Setup

1. Install dependencies: `npm install`
2. Start the server: `npm start` (runs on http://localhost:3000)
3. Open browser to http://localhost:3000

## What to Test

### Product Listing
- All 6 products should render in a responsive grid
- Each card shows: product name, price (formatted as $XX.XX), and "Add to Cart" button
- Products are fetched from `/api/products` API endpoint

### Cart Sidebar
- Clicking "Add to Cart" should slide the sidebar in from the right
- Cart badge in header updates with total item count
- Each cart item shows: name, price, quantity, and +/− controls
- Running total at the bottom updates reactively

### Cart Logic
- Adding same product multiple times increments quantity (doesn't duplicate)
- "+" increases quantity and updates total
- "−" decreases quantity; removing at qty 0 removes item entirely
- Cart state persists when sidebar is closed and reopened
- Clicking overlay or X button closes the sidebar

## Architecture Notes
- `server.js` — Express server, serves static files from `public/` and `/api/products`
- `public/main.js` — Client-side cart logic (state in `cart` array, DOM updates via `updateCart()`)
- `public/styles.css` — Sidebar slides via CSS transition on `.cart-sidebar.open` (right: 0)
- `public/index.html` — Page structure

## Common Issues
- Placeholder images may not load if via.placeholder.com is unreachable; this doesn't affect functionality
- The cart is client-side only (no persistence across page refresh)
