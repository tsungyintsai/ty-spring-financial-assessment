// product/interfaces/http/productController.js
// Controller to handle HTTP requests related to products.

const generateProductCommandHandler = require('../../../application/GenerateProductCommandHandler');
const getProductsQueryHandler = require('../../../application/GetProductsQueryHandler');

const productController = {
  /**
   * Handles the POST request to generate products.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   */
  async generateProducts(req, res) {
    try {
      await generateProductCommandHandler.execute(100);
      res.status(201).json({ message: '100 products generated successfully.' });
    } catch (error) {
      console.error('Error generating products:', error);
      res.status(500).json({ message: 'Failed to generate products.' });
    }
  },

  /**
   * Handles the GET request to retrieve products.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   */
  async getProducts(req, res) {
    try {
      const { q: searchTerm } = req.query; // e.g., /products?q=book
      const products = await getProductsQueryHandler.execute(searchTerm);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve products.' });
    }
  }
};

module.exports = { productController };

