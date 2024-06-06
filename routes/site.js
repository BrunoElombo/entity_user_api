const express = require('express');
const siteRoutes = express.Router();
const { getEmployeeSites, getAllSites } = require("../controllers/siteController");

const verifyJWT = require("../middlewear/verifyJWT");

siteRoutes.get("/", getEmployeeSites);
siteRoutes.get("/all", getAllSites);

module.exports = siteRoutes;