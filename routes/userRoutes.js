const express = require('express')
const userRoutes = express.Router()
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyJWT");
const { validateUser, validateUserLogin, validateUserUpdate } = require('../validations/userValidation');


userRoutes.post('/register', validateUser, userController.register);
userRoutes.get('/', userController.getAllUsers);
userRoutes.get('/profile', verifyToken, userController.getProfile);
userRoutes.patch('/update/:id', userController.updateProfile);
userRoutes.delete('/delete/:id', userController.deleteUser);

module.exports = userRoutes;