const Users = require('../models/Users');

class UsersController {
  async index(req, res) {
    // List all userss
    res.send('List all userss');
  }

  async show(req, res) {
    // Show one userss
    res.send(`Show userss with id ${req.params.id}`);
  }

  async store(req, res) {
    // Create new userss
    res.send('Create new userss');
  }

  async update(req, res) {
    // Update userss
    res.send(`Update userss with id ${req.params.id}`);
  }

  async destroy(req, res) {
    // Delete userss
    res.send(`Delete userss with id ${req.params.id}`);
  }
}

module.exports = new UsersController();
