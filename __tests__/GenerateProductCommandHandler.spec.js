// __tests__/GenerateProductCommandHandler.spec.js
// Unit test for the GenerateProductCommandHandler.

const GenerateProductCommandHandler = require('../product/application/GenerateProductCommandHandler');
const productRepository = require('../product/infrastructure/ProductRepository');
const Product = require('../product/domain/Product');

// Mock the repository to avoid actual database calls
jest.mock('../product/infrastructure/ProductRepository', () => ({
  add: jest.fn().mockResolvedValue({ id: 1 }),
}));

describe('GenerateProductCommandHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate and save 100 products', async () => {
    // Arrange
    const count = 100;

    // Act
    await GenerateProductCommandHandler.execute(count);

    // Assert
    expect(productRepository.add).toHaveBeenCalledTimes(count);
    // Verify that the repository's add method was called with a Product instance
    expect(productRepository.add).toHaveBeenCalledWith(expect.any(Product));
  });

  it('should handle repository errors gracefully', async () => {
    // Arrange
    const errorMessage = 'Database error';
    productRepository.add.mockRejectedValue(new Error(errorMessage));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Act
    await GenerateProductCommandHandler.execute(1); // Test with one product for simplicity

    // Assert
    expect(productRepository.add).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to insert product'),
      expect.any(Error)
    );
    
    // Clean up the spy
    consoleErrorSpy.mockRestore();
  });
});
