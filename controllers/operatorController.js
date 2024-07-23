// controllers/operatorController.js
const operatorService = require('../services/operatorService');

exports.createOperator = async (req, res) => {
  try {
    const operator = await operatorService.createOperator(req.body);
    res.status(201).json(operator);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllOperators = async (req, res) => {
  try {
    const operators = await operatorService.getAllOperators();
    res.json(operators);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOperatorById = async (req, res) => {
  try {
    const operator = await operatorService.getOperatorById(req.params.id);
    res.json(operator);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateOperator = async (req, res) => {
  try {
    const operator = await operatorService.updateOperator(req.params.id, req.body);
    res.json(operator);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteOperator = async (req, res) => {
  try {
    await operatorService.deleteOperator(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};