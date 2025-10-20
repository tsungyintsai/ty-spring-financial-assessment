// product/interfaces/http/productController.js
// Controller to handle HTTP requests related to products.

const generateProductCommandHandler = require('../../../application/GenerateProductCommandHandler');

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
  }
};

module.exports = { productController };
