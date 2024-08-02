// routes/operatorRoutes.js
const express = require('express');
const router = express.Router();
const verifyJWT = require('../middlewares/verifyJWT');
const operatorController = require('../controllers/operatorController');
const { validateOperator, validateOperatorUpdate } = require('../validations/operatorValidation');

router.post('/', validateOperator, operatorController.createOperator);
router.get('/:id/accounts', verifyJWT, operatorController.getOperatorAccounts);
router.get('/', operatorController.getAllOperators);
router.get('/:id', operatorController.getOperatorById);
router.patch('/:id', validateOperatorUpdate, operatorController.updateOperator);
router.delete('/:id', operatorController.deleteOperator);

module.exports = router;