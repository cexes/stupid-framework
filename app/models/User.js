const db = require('../../config/database');

class User {
  static all() {
    return db('users');
  }

  static find(id) {
    return db('users').where({ id }).first();
  }

  static create(data) {
    return db('users').insert(data);
  }

  static update(id, data) {
    return db('users').where({ id }).update(data);
  }

  static delete(id) {
    return db('users').where({ id }).delete();
  }
}

module.exports = User;
