const express = require("express");
const accountRouter = express.Router();
const verifyJWT = require("../middlewear/verifyJWT");
const {getAllEntityAccounts} = require("../controllers/accountController");

accountRouter.get("/", verifyJWT, getAllEntityAccounts);


module.exports = accountRouter;


