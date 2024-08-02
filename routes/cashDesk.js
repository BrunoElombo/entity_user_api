const express = require("express");
const cashDesk = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const { getCashDesks } = require("../controllers/CashDesk")

cashDesk.get("/", verifyJWT, getCashDesks);


module.exports = cashDesk