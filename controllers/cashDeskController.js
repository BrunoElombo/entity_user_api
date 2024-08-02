// controllers/cashDeskController.js
const cashDeskService = require('../services/cashDeskService');

exports.createCashDesk = async (req, res) => {
  try {
    const cashDesk = await cashDeskService.createCashDesk(req.body);
    res.status(201).json(cashDesk);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCashDesks = async (req, res) => {
  try {
    const cashDesks = await cashDeskService.getAllCashDesks();
    res.json(cashDesks);
  } catch (error) {
    res.sendStatus(400);
  }
};

exports.getCashDeskById = async (req, res) => {
  try {
    const cashDesk = await cashDeskService.getCashDeskById(req.params.id, req.entity);
    res.json(cashDesk);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateCashDesk = async (req, res) => {
  try {
    const cashDesk = await cashDeskService.updateCashDesk(req.params.id, req.body, req.entity);
    res.json(cashDesk);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCashDesk = async (req, res) => {
  try {
    await cashDeskService.deleteCashDesk(req.params.id, req.entity);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};