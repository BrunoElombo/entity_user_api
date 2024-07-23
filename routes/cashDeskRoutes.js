// routes/cashDeskRoutes.js
const express = require('express');
const router = express.Router();
const cashDeskController = require('../controllers/cashDeskController');
const { validateCashDesk, validateCashDeskUpdate } = require('../validations/cashDeskValidation');

router.post('/', validateCashDesk, cashDeskController.createCashDesk);
router.get('/', cashDeskController.getAllCashDesks);
router.get('/:id', cashDeskController.getCashDeskById);
router.put('/:id', validateCashDeskUpdate, cashDeskController.updateCashDesk);
router.delete('/:id', cashDeskController.deleteCashDesk);

module.exports = router;