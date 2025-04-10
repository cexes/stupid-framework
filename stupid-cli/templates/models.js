const db = require('../../config/database');

class {{ModelName}} {
  static  async all() {
    return await db('{{tableName}}');
  }

  static async find(id) {
    return await db('{{tableName}}').where({ id }).first();
  }

  static async create(data) {
    return await  db('{{tableName}}').insert(data);
  }

  static async update(id, data) {
    return await db('{{tableName}}').where({ id }).update(data);
  }

  static async delete(id) {
    return await db('{{tableName}}').where({ id }).delete();
  }
}

module.exports = {{ModelName}};
