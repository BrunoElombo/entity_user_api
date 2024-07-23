// routes/currencyRoutes.js
const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');
const { validateCurrency, validateCurrencyUpdate } = require('../validations/currencyValidation');

router.post('/', validateCurrency, currencyController.createCurrency);
router.get('/', currencyController.getAllCurrencies);
router.get('/:id', currencyController.getCurrencyById);
router.put('/:id', validateCurrencyUpdate, currencyController.updateCurrency);
router.delete('/:id', currencyController.deleteCurrency);

module.exports = router;