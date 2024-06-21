const express = require('express');
const operatorRouter = express.Router();
const verifyJWT = require("../middlewear/verifyJWT");
const { getAllOperators, getOperatorById, getOperatorAccounts } = require('../controllers/operatorsController');


operatorRouter.get('/', verifyJWT, getAllOperators);
operatorRouter.get('/:id', verifyJWT, getOperatorById);
operatorRouter.get('/:id/accounts', verifyJWT, getOperatorAccounts);

module.exports = operatorRouter;