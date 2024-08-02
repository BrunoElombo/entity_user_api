const express = require("express");
const bankAccountRouter = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const { getBankByEmployee, getBankByEntity } = require("../controllers/bankAccountController")
const bankAccountController = require('../controllers/bankAccountController');
const { validateBankAccount } = require('../validations/bankAccountValidation');

// bankRouter.get("/", verifyJWT, getEmployeeBanks);
bankAccountRouter.get("/:entity_id", verifyJWT, getBankByEntity);
bankAccountRouter.get("/:employee_id", verifyJWT, getBankByEmployee);

bankAccountRouter.post('/', validateBankAccount, bankAccountController.createBankAccount);
bankAccountRouter.get('/', bankAccountController.getAllBankAccounts);
bankAccountRouter.get('/:id', bankAccountController.getBankAccountById);
bankAccountRouter.patch('/:id', bankAccountController.updateBankAccount);
bankAccountRouter.delete('/:id', bankAccountController.deleteBankAccount);

module.exports = bankAccountRouter