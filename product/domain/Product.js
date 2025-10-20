// product/domain/Product.js
// Represents the Product entity in the domain model.

class Product {
  constructor(name, description, category, brand, price, stock_num, SKU) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.brand = brand;
    this.price = price;
    this.stock_num = stock_num;
    this.SKU = SKU;
  }
}

module.exports = Product;
