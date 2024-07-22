// controllers/functionController.js
const functionService = require('../services/functionService');

exports.createFunction = async (req, res) => {
  try {
    const func = await functionService.createFunction(req.body);
    res.status(201).json(func);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllFunctions = async (req, res) => {
  try {
    const functions = await functionService.getAllFunctions();
    res.json(functions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFunctionById = async (req, res) => {
  try {
    const func = await functionService.getFunctionById(req.params.id);
    res.json(func);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateFunction = async (req, res) => {
  try {
    const func = await functionService.updateFunction(req.params.id, req.body);
    res.json(func);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteFunction = async (req, res) => {
  try {
    await functionService.deleteFunction(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};