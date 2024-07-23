const express = require('express')
const userRoutes = express.Router()
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyJWT");
const { validateUser, validateUserLogin, validateUserUpdate } = require('../validations/userValidation');

// userRoutes.get('/account', verifyToken, userController.getUser);
// userRoutes.get('/:id', userController.getUser);
// userRoutes.post('/', userController.createUser);
// userRoutes.delete('/:id', userController.deleteUser);
// routes/userRoutes.js


// Updates
userRoutes.post('/register', validateUser, userController.register);
userRoutes.get('/', userController.getAllUsers);
userRoutes.get('/profile', verifyToken, userController.getProfile);
userRoutes.patch('/update/:id', userController.updateProfile);
userRoutes.delete('/delete/:id', userController.deleteUser);

module.exports = userRoutes;