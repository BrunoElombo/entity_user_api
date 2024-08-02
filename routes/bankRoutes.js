// routes/bankRoutes.js
const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');
const verifyJWT = require("../middlewares/verifyJWT");
const { validateBank, validateBankUpdate } = require('../validations/bankValidation');

router.post('/', validateBank, bankController.createBank);
router.get('/', bankController.getAllBanks);
router.get("/entity-banks", verifyJWT, bankController.getEntityBanks);
router.get('/:id', bankController.getBankById);
router.patch('/:id', validateBankUpdate, bankController.updateBank);
router.delete('/:id', bankController.deleteBank);

module.exports = router;