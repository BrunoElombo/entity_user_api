// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { validateAccount, validateAccountUpdate } = require('../validations/accountValidation');

router.post('/', validateAccount, accountController.createAccount);
router.get('/', accountController.getAllAccounts);
router.get('/:id', accountController.getAccountById);
router.put('/:id', validateAccountUpdate, accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;