const express = require('express');
const router = express.Router();
const { validateExternalEntity, validateExternalEntityUpdate } = require('../validations/externalEntityValidation');
const externalEntityController = require('../controllers/externalEntityController');
const verifyToken = require("../middlewares/verifyJWT");

router.post('/create', verifyToken, validateExternalEntity, externalEntityController.createExternalEntity);
router.get('/', verifyToken, externalEntityController.getAllExternalEntities);
router.get('/:id', verifyToken, externalEntityController.getExternalEntityById);
router.put('/:id', verifyToken, validateExternalEntityUpdate, externalEntityController.updateExternalEntity);
router.delete('/:id', verifyToken, externalEntityController.deleteExternalEntity);

// Get entity detail including specific employees
// router.get('/:id_entity/detail', EntityController.getEntityDetail);

module.exports = router;
