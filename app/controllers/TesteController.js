const Teste = require('../models/Teste');

class TesteController {
  async index(req, res) {
    // List all testes
    res.send('List all testes');
  }

  async show(req, res) {
    // Show one testes
    res.send(`Show testes with id ${req.params.id}`);
  }

  async store(req, res) {
    // Create new testes
    res.send('Create new testes');
  }

  async update(req, res) {
    // Update testes
    res.send(`Update testes with id ${req.params.id}`);
  }

  async destroy(req, res) {
    // Delete testes
    res.send(`Delete testes with id ${req.params.id}`);
  }
}

module.exports = new TesteController();
