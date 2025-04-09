const db = require('../../config/database');

class Product {
  static all() {
    return db('products');
  }

  static find(id) {
    return db('products').where({ id }).first();
  }

  static create(data) {
    return db('products').insert(data);
  }

  static update(id, data) {
    return db('products').where({ id }).update(data);
  }

  static delete(id) {
    return db('products').where({ id }).delete();
  }
}

module.exports = Product;
