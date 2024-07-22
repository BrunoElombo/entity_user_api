// routes/typeRoutes.js
const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');
const { validateType, validateTypeUpdate } = require('../validations/typeValidation');

router.post('/create', validateType, typeController.createType);
router.get('/', typeController.getAllTypes);
router.get('/:id', typeController.getTypeById);
router.put('/:id', validateTypeUpdate, typeController.updateType);
router.delete('/:id', typeController.deleteType);

module.exports = router;