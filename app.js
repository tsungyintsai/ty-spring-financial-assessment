// app.js
// Main entry point for the Express application.

const express = require('express');
const { productController } = require('./product/interfaces/http/productController');

const app = express();
const port = 3000;

app.use(express.json());

// Define the route for generating products.
app.post('/products/generate', productController.generateProducts);

// Start the server.
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
