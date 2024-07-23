const express = require('express');
const router = express.Router();
const { refreshTokenController} = require('../controllers/refreshController');


router.get('/', refreshTokenController);

module.exports = router;