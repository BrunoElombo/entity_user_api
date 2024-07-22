const express = require('express')
const userRoutes = express.Router()
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyJWT");

userRoutes.get('/account', verifyToken, userController.getUser);
userRoutes.get('/:id', userController.getUser);
userRoutes.post('/', userController.createUser);
userRoutes.delete('/:id', userController.deleteUser);
// routes/userRoutes.js


// Updates
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');
const { validateUser, validateUserLogin, validateUserUpdate } = require('../validations/userValidation');

userRoutes.post('/register', validateUser, userController.register);
userRoutes.post('/login', validateUserLogin, userController.login);
userRoutes.get('/profile', userController.getProfile);
userRoutes.patch('/update/:id', userController.updateProfile);
userRoutes.delete('/delete', userController.deleteUser);

// module.exports = router;


module.exports = userRoutes;