const db = require('../../config/database');

class {{ModelName}} {
  static all() {
    return db('{{tableName}}');
  }

  static find(id) {
    return db('{{tableName}}').where({ id }).first();
  }

  static create(data) {
    return db('{{tableName}}').insert(data);
  }

  static update(id, data) {
    return db('{{tableName}}').where({ id }).update(data);
  }

  static delete(id) {
    return db('{{tableName}}').where({ id }).delete();
  }
}

module.exports = {{ModelName}};
