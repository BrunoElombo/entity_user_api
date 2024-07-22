// controllers/associerController.js
const associateService = require('../services/associateService');

exports.createAssociates = async (req, res) => {
  try {
    const associate = await associateService.createAssociates(req.body);
    res.status(201).json(associate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAssociates = async (req, res) => {
  try {
    const associers = await associateService.getAllAssociates();
    res.json(associers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAssociateById = async (req, res) => {
  try {
    const associate = await associateService.getAssocierById(req.params.id);
    res.json(associate);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateAssociate = async (req, res) => {
  try {
    const associate = await associateService.updateAssociate(req.params.id, req.body);
    res.json(associate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAssociate = async (req, res) => {
  try {
    await associateService.deleteAssociate(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};