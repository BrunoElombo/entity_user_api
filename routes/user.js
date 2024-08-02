const express = require('express')
const userRoutes = express.Router()
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyJWT");
const { validateUser, validateUserUpdate } = require('../validations/userValidation');

userRoutes.get('/', verifyToken, userController.getAllUsers);
userRoutes.get('/account', verifyToken, userController.getUser);
userRoutes.get('/:id', verifyToken, userController.getUser);
userRoutes.post('/', validateUser, userController.createUser);
userRoutes.delete('/:id', userController.deleteUser);


module.exports = userRoutes;