// routes/echelonCategoryRoutes.js
const express = require('express');
const router = express.Router();
const echelonCategoryController = require('../controllers/echelonCategoryController');
const { validateEchelonCategory, validateEchelonCategoryUpdate } = require('../validations/echelonCategoryValidation');

router.post('/', validateEchelonCategory, echelonCategoryController.createEchelonCategory);
router.get('/', echelonCategoryController.getAllEchelonCategories);
router.get('/:id', echelonCategoryController.getEchelonCategoryById);
router.patch('/:id', validateEchelonCategoryUpdate, echelonCategoryController.updateEchelonCategory);
router.delete('/:id', echelonCategoryController.deleteEchelonCategory);

module.exports = router;