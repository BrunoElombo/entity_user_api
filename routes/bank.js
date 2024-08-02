const express = require("express");
const bankRouter = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const { getEmployeeBanks, getEntityBanks } = require("../controllers/bankController")

bankRouter.get("/", verifyJWT, getEmployeeBanks);
bankRouter.get("/entity_banks", verifyJWT, getEntityBanks);


module.exports = bankRouter
