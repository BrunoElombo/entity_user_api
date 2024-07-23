const express = require("express");
const authRouter = express.Router()
const authController = require("../controllers/authController")

authRouter.post('/', authController.login);

module.exports = authRouter;