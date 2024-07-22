const express = require("express");
const accountRouter = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const {getAllEntityAccounts} = require("../controllers/accountController");

accountRouter.get("/", verifyJWT, getAllEntityAccounts);


module.exports = accountRouter;


