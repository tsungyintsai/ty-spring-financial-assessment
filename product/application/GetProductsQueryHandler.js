// product/application/GetProductsQueryHandler.js
// Handles the logic for retrieving products.

const productRepository = require('../infrastructure/ProductRepository');

class GetProductsQueryHandler {
    /**
     * Executes the command to get products.
     * @param {string} [searchTerm] - The term to search for.
     * @returns {Promise<Product[]>} A promise that resolves with an array of products.
     */
    async execute(searchTerm) {
        console.log(searchTerm ? `Searching for products with term: ${searchTerm}` : 'Fetching all products...');
        try {
            const products = await productRepository.findAll(searchTerm);
            console.log('Products fetched successfully.');
            return products;
        } catch (error) {
            console.error('Failed to fetch products', error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }
}

module.exports = new GetProductsQueryHandler();

