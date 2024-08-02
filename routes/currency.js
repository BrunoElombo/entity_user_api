const express = require("express");
const currencyRouter = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const { getCurrencies } = require("../controllers/currencyController")

currencyRouter.get("/", verifyJWT, getCurrencies);


module.exports = currencyRouter