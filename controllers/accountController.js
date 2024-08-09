// controllers/accountController.js
const accountService = require('../services/accountService');

exports.createAccount = async (req, res) => {
  try {
    const account = await accountService.createAccount(req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAccounts = async (req, res) => {
  // Get the query parameters "types"
  let  { type } = req.query;

  // get the accounts by 
  try {
    if(type){
      let account = await accountService.getAccountByType(type);
      return res.send(account);
    }
    const accounts = await accountService.getAllAccounts();
    res.json(accounts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const account = await accountService.getAccountById(req.params.id);
    res.json(account);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const account = await accountService.updateAccount(req.params.id, req.body);
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await accountService.deleteAccount(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};