const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken' );
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

exports.getCurrencies = async (req, res)=>{
    try {
        // Get the connected user
      const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
      const userId = decodedToken.id;

      const currencies = await prisma.Currency.findMany({
        
        where:{
            isActive: true
        },
        include:{
            currencyCuts: true
        }
      });


      return res.status(200).json(currencies);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
}

