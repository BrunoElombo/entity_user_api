const express = require("express");
const accountRouter = express.Router();
const verifyJWT = require("../middlewear/verifyJWT");

accountRouter.get("/", verifyJWT);


