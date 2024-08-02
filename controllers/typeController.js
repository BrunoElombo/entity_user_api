// controllers/typeController.js
const typeService = require('../services/typeService');

exports.createType = async (req, res) => {
  try {
    const type = await typeService.createType(req.body);
    res.status(201).json(type);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTypes = async (req, res) => {
  try {
    const types = await typeService.getAllTypes();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTypeById = async (req, res) => {
  try {
    const type = await typeService.getTypeById(req.params.id);
    res.json(type);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateType = async (req, res) => {
  try {
    const type = await typeService.updateType(req.params.id, req.body);
    res.json(type);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteType = async (req, res) => {
  try {
    await typeService.deleteType(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};