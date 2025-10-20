// product/infrastructure/ProductRepository.js
// Handles database operations for Products using SQLite.

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'products.db');

class ProductRepository {
  constructor() {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database', err.message);
      } else {
        console.log('Connected to the SQLite database.');
        this.initialize();
      }
    });
  }

  /**
   * Initializes the database by creating the products table if it doesn't exist.
   */
  initialize() {
    const sql = `
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT,
        brand TEXT,
        price REAL,
        stock_num INTEGER,
        SKU TEXT UNIQUE
      )
    `;
    return this.db.run(sql);
  }

  /**
   * Adds a new product to the database.
   * @param {Product} product - The product object to add.
   * @returns {Promise<any>} A promise that resolves with the result of the database operation.
   */
  async add(product) {
    const { name, description, category, brand, price, stock_num, SKU } = product;
    const sql = `INSERT INTO products (name, description, category, brand, price, stock_num, SKU) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      this.db.run(sql, [name, description, category, brand, price, stock_num, SKU], function (err) {
        if (err) {
          console.error('Error inserting product', err.message);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  /**
   * Retrieves products from the database.
   * If a search term is provided, it filters products by name, description, category, brand, and SKU.
   * @param {string} [searchTerm] - The term to search for.
   * @returns {Promise<Product[]>} A promise that resolves with an array of products.
   */
  async findAll(searchTerm) {
    let sql = `SELECT * FROM products`;
    const params = [];

    if (searchTerm) {
      sql += ` WHERE name LIKE ? OR description LIKE ? OR category LIKE ? OR brand LIKE ? OR SKU LIKE ?`;
      const likeTerm = `%${searchTerm}%`;
      params.push(likeTerm, likeTerm, likeTerm, likeTerm, likeTerm);
    }

    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.error('Error fetching products', err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = new ProductRepository();
