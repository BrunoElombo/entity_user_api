const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/productController');
const verifyJWT = require('../middlewares/verifyJWT');

// Routes for CRUD operations on products
productRoutes.post('/', verifyJWT, productController.createProduct);
productRoutes.get('/', verifyJWT, productController.getAllProducts);
productRoutes.get('/:id', verifyJWT, productController.getProductById);
productRoutes.patch('/:id', verifyJWT, productController.updateProduct);
productRoutes.delete('/:id', verifyJWT, productController.deleteProduct);

module.exports = productRoutes;