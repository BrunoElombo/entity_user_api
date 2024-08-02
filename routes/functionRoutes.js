// routes/functionRoutes.js
const express = require('express');
const router = express.Router();
const functionController = require('../controllers/functionController');
const { validateFunction, validateFunctionUpdate } = require('../validations/functionValidation');

router.post('/', validateFunction, functionController.createFunction);
router.get('/', functionController.getAllFunctions);
router.get('/:id', functionController.getFunctionById);
router.patch('/:id', validateFunctionUpdate, functionController.updateFunction);
router.delete('/:id', functionController.deleteFunction);

module.exports = router;