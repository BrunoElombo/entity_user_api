// controllers/currencyController.js
const currencyService = require('../services/currencyService');

exports.createCurrency = async (req, res) => {
  try {
    const currency = await currencyService.createCurrency(req.body);
    res.status(201).json(currency);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCurrencies = async (req, res) => {
  try {
    const currencies = await currencyService.getAllCurrencies();
    res.json(currencies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCurrencyById = async (req, res) => {
  try {
    const currency = await currencyService.getCurrencyById(req.params.id);
    res.json(currency);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateCurrency = async (req, res) => {
  try {
    const currency = await currencyService.updateCurrency(req.params.id, req.body);
    res.json(currency);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCurrency = async (req, res) => {
  try {
    await currencyService.deleteCurrency(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};