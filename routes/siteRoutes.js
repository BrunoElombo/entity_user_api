// routes/siteRoutes.js
const express = require('express');
const router = express.Router();
const verifyJWT = require('../middlewares/verifyJWT')
const siteController = require('../controllers/siteController');
const { validateSite, validateSiteUpdate } = require('../validations/siteValidation');

router.post('/', validateSite, siteController.createSite);
router.get('/', verifyJWT, siteController.getEmployeeSites);
router.get('/:id', siteController.getSiteById);
router.patch('/:id', validateSiteUpdate, siteController.updateSite);
router.delete('/:id', siteController.deleteSite);

module.exports = router;