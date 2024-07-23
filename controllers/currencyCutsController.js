// controllers/currencyCutsController.js
const currencyCutsService = require('../services/currencyCutsService');

exports.createCurrencyCuts = async (req, res) => {
  try {
    const currencyCuts = await currencyCutsService.createCurrencyCuts(req.body);
    res.status(201).json(currencyCuts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCurrencyCuts = async (req, res) => {
  try {
    const currencyCuts = await currencyCutsService.getAllCurrencyCuts();
    res.json(currencyCuts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCurrencyCutsById = async (req, res) => {
  try {
    const currencyCuts = await currencyCutsService.getCurrencyCutsById(req.params.id);
    res.json(currencyCuts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateCurrencyCuts = async (req, res) => {
  try {
    const currencyCuts = await currencyCutsService.updateCurrencyCuts(req.params.id, req.body);
    res.json(currencyCuts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCurrencyCuts = async (req, res) => {
  try {
    await currencyCutsService.deleteCurrencyCuts(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};