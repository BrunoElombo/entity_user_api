// controllers/echelonCategoryController.js
const echelonCategoryService = require('../services/echelonCategoryService');

exports.createEchelonCategory = async (req, res) => {
  try {
    const echelonCategory = await echelonCategoryService.createEchelonCategory(req.body);
    res.status(201).json(echelonCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllEchelonCategories = async (req, res) => {
  try {
    const echelonCategories = await echelonCategoryService.getAllEchelonCategories();
    res.json(echelonCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEchelonCategoryById = async (req, res) => {
  try {
    const echelonCategory = await echelonCategoryService.getEchelonCategoryById(req.params.id);
    res.json(echelonCategory);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateEchelonCategory = async (req, res) => {
  try {
    const echelonCategory = await echelonCategoryService.updateEchelonCategory(req.params.id, req.body);
    res.json(echelonCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEchelonCategory = async (req, res) => {
  try {
    await echelonCategoryService.deleteEchelonCategory(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};