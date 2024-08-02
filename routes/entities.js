const express = require('express');
const router = express.Router();
const EntityController = require('../controllers/entityController');
const verifyToken = require("../middlewares/verifyJWT");
const { validateEntity, validateEntityUpdate } = require('../validations/employeeValidation')

// CRUD operations for Entity
router.post('/', validateEntity, EntityController.createEntity);
router.get('/', EntityController.getAllEntities);
router.get('/:id', EntityController.getEntityById);
router.patch('/:id', validateEntityUpdate, EntityController.updateEntity);
router.delete('/:id', EntityController.deleteEntity);

router.get('/', verifyToken, EntityController.getAllEntities);
router.get('/all', verifyToken, EntityController.ListAllEntities);
router.get('/:id',  verifyToken, EntityController.getEntityById);
router.get('/:id/banks',  verifyToken, EntityController.getExternalEntityBanks);
router.post('/', verifyToken, EntityController.createEntity);
router.put('/:id',  verifyToken, EntityController.updateEntity);
router.delete('/:id',   verifyToken, EntityController.deleteEntity);

// Get entity detail including specific employees
router.get('/:entity_id', EntityController.getEmployeeEntities);

module.exports = router;
