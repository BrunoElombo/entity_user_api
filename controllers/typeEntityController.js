// controllers/typeEntityController.js
const typeEntityService = require('../services/typeEntityService');

exports.createTypeEntity = async (req, res) => {
  try {
    const typeEntity = await typeEntityService.createTypeEntity(req.body);
    res.status(201).json(typeEntity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTypeEntities = async (req, res) => {
  try {
    const typeEntities = await typeEntityService.getAllTypeEntities();
    res.json(typeEntities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTypeEntityById = async (req, res) => {
  try {
    const typeEntity = await typeEntityService.getTypeEntityById(req.params.id);
    res.json(typeEntity);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateTypeEntity = async (req, res) => {
  try {
    const typeEntity = await typeEntityService.updateTypeEntity(req.params.id, req.body);
    res.json(typeEntity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTypeEntity = async (req, res) => {
  try {
    await typeEntityService.deleteTypeEntity(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};