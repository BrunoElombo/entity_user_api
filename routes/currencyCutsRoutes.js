// routes/currencyCutsRoutes.js
const express = require('express');
const router = express.Router();
const currencyCutsController = require('../controllers/currencyCutsController');
const { validateCurrencyCuts, validateCurrencyCutsUpdate } = require('../validations/currencyCutsValidation');

router.post('/', validateCurrencyCuts, currencyCutsController.createCurrencyCuts);
router.get('/', currencyCutsController.getAllCurrencyCuts);
router.get('/:id', currencyCutsController.getCurrencyCutsById);
router.patch('/:id', validateCurrencyCutsUpdate, currencyCutsController.updateCurrencyCuts);
router.delete('/:id', currencyCutsController.deleteCurrencyCuts);

module.exports = router;