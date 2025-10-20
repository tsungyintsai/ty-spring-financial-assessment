// product/application/GenerateProductCommandHandler.js
// Handles the logic for generating multiple products.

const { faker } = require('@faker-js/faker');
const Product = require('../domain/Product');
const productRepository = require('../infrastructure/ProductRepository');

class GenerateProductCommandHandler {
  /**
   * Executes the command to generate and save a specified number of products.
   * @param {number} count - The number of products to generate.
   */
  async execute(count = 100) {
    console.log(`Generating ${count} products...`);
    for (let i = 0; i < count; i++) {
      const product = new Product(
        faker.commerce.productName(),
        faker.commerce.productDescription(),
        faker.commerce.department(),
        faker.company.name(),
        parseFloat(faker.commerce.price()),
        faker.number.int({ min: 0, max: 1000 }),
        faker.string.uuid() // Using uuid for SKU for simplicity
      );
      try {
        await productRepository.add(product);
      } catch (error) {
        console.error(`Failed to insert product: ${product.name}`, error);
        // Decide if you want to stop or continue on error
      }
    }
    console.log(`${count} products generated and inserted.`);
  }
}

module.exports = new GenerateProductCommandHandler();
