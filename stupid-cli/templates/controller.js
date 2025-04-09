const {{ModelName}} = require('../models/{{ModelName}}');

class {{ControllerName}} {
  async index(req, res) {
    // List all {{tableName}}
    res.send('List all {{tableName}}');
  }

  async show(req, res) {
    // Show one {{tableName}}
    res.send(`Show {{tableName}} with id ${req.params.id}`);
  }

  async store(req, res) {
    // Create new {{tableName}}
    res.send('Create new {{tableName}}');
  }

  async update(req, res) {
    // Update {{tableName}}
    res.send(`Update {{tableName}} with id ${req.params.id}`);
  }

  async destroy(req, res) {
    // Delete {{tableName}}
    res.send(`Delete {{tableName}} with id ${req.params.id}`);
  }
}

module.exports = new {{ControllerName}}();
