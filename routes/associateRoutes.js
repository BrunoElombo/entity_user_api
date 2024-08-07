// routes/associateRoutes.js
const express = require('express');
const router = express.Router();
const associateController = require('../controllers/associateController');
const { validateAssociate, validateAssociateUpdate } = require('../validations/associateValidation');

router.post('/', validateAssociate, associateController.createAssociates);
router.get('/', associateController.getAllAssociates);
router.get('/:id', associateController.getAssociateById);
router.patch('/:id', validateAssociateUpdate, associateController.getAssociateById);
router.delete('/:id', associateController.deleteAssociate);

module.exports = router;