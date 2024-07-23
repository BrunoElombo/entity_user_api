// controllers/bankController.js
const bankService = require('../services/bankService');

exports.createBank = async (req, res) => {
  try {
    const bank = await bankService.createBank(req.body);
    res.status(201).json(bank);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBanks = async (req, res) => {
  try {
    const banks = await bankService.getAllBanks();
    res.json(banks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBankById = async (req, res) => {
  try {
    const bank = await bankService.getBankById(req.params.id);
    res.json(bank);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateBank = async (req, res) => {
  try {
    const bank = await bankService.updateBank(req.params.id, req.body);
    res.json(bank);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBank = async (req, res) => {
  try {
    await bankService.deleteBank(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};