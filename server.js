const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Product data
const products = [
  { id: 1, name: 'Wireless Headphones', price: 59.99, image: 'https://via.placeholder.com/200x200/6c5ce7/ffffff?text=Headphones' },
  { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://via.placeholder.com/200x200/00b894/ffffff?text=Watch' },
  { id: 3, name: 'Laptop Stand', price: 34.99, image: 'https://via.placeholder.com/200x200/fdcb6e/333333?text=Stand' },
  { id: 4, name: 'Mechanical Keyboard', price: 89.99, image: 'https://via.placeholder.com/200x200/e17055/ffffff?text=Keyboard' },
  { id: 5, name: 'USB-C Hub', price: 45.99, image: 'https://via.placeholder.com/200x200/0984e3/ffffff?text=USB-C+Hub' },
  { id: 6, name: 'Webcam HD', price: 74.99, image: 'https://via.placeholder.com/200x200/d63031/ffffff?text=Webcam' }
];

// API endpoint for products
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
