const express = require('express');
const router = express.Router();
const verifyJWT = require('../middlewares/verifyJWT');
const cashDeskController = require('../controllers/cashDeskController');
const { validateCashDesk, validateCashDeskUpdate } = require('../validations/cashDeskValidation');

router.post('/', verifyJWT, validateCashDesk, cashDeskController.createCashDesk);
router.get('/', cashDeskController.getAllCashDesks);
router.get('/:id', cashDeskController.getCashDeskById);
router.patch('/:id', verifyJWT, validateCashDeskUpdate, cashDeskController.updateCashDesk);
router.delete('/:id', verifyJWT, cashDeskController.deleteCashDesk);

module.exports = router;