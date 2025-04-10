const User = require('../models/User');

class UserController {
  async index(req, res) {
    // List all users
    res.send('List all users');
  }

  async show(req, res) {
    // Show one users
    res.send(`Show users with id ${req.params.id}`);
  }

  async store(req, res) {
    // Create new users
    res.send('Create new users');
  }

  async update(req, res) {
    // Update users
    res.send(`Update users with id ${req.params.id}`);
  }

  async destroy(req, res) {
    // Delete users
    res.send(`Delete users with id ${req.params.id}`);
  }
}

module.exports = new UserController();
