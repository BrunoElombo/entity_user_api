// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProduct, validateProductUpdate } = require('../validations/productValidation');

router.post('/', validateProduct, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.patch('/:id', validateProductUpdate, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;