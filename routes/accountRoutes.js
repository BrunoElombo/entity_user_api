// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { validateAccount, validateAccountUpdate } = require('../validations/accountValidation');

/**
 * @swagger
 * tags:
 *   name: Banks
 *   description: Bank management
 */
/**
 * @swagger
 * /api/banks/:
 *   post:
 *     summary: Create a new bank
 *     tags: [Banks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               displayName:
 *                 type: string
 *               sigle:
 *                 type: string
 *               Acronyme:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bank created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', validateAccount, accountController.createAccount);
router.get('/', accountController.getAllAccounts);
router.get('/:id', accountController.getAccountById);
router.put('/:id', validateAccountUpdate, accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;