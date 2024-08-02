const express = require('express');
const router = express.Router();
const { validateExternalEntity, validateExternalEntityUpdate } = require('../validations/externalEntityValidation');
const externalEntityController = require('../controllers/externalEntityController');
const verifyToken = require("../middlewares/verifyJWT");

router.post('/', validateExternalEntity, externalEntityController.createExternalEntity);
router.get('/', externalEntityController.getAllExternalEntities);
router.get('/:id/banks', externalEntityController.getExternalEntityBanks);
// router.get('/:id', externalEntityController.getExternalEntityById);
router.patch('/:id', verifyToken, validateExternalEntityUpdate, externalEntityController.updateExternalEntity);
router.delete('/:id', verifyToken, externalEntityController.deleteExternalEntity);

// Get entity detail including specific employees
// router.get('/:id_entity/detail', EntityController.getEntityDetail);

module.exports = router;
