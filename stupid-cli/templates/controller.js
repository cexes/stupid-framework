const {{ModelName}} = require('../models/{{ModelName}}');

class {{ControllerName}} {
  async index(req, res) {
    try {
      const listIndex = await {{ModelName}}.all();
      res.json(listIndex);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const item = await {{ModelName}}.find(req.params.id);
      if (!item) {
        return res.status(404).json({ error: '{{ModelName}} not found' });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const data = req.body;
      const created = await {{ModelName}}.create(data);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const data = req.body;
      const updated = await {{ModelName}}.update(req.params.id, data);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      await {{ModelName}}.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new {{ControllerName}}();
