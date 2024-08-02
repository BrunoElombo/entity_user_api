const express = require('express');
const router = express.Router();
const entityController = require('../controllers/entityController');
const verifyToken = require("../middlewares/verifyJWT");

// CRUD operations for Entity
// router.get('/', verifyToken, entityController.getAllEntities);
router.get('/all', verifyToken, entityController.ListAllEntities);
// router.get('/:id',  verifyToken, entityController.getEntityById);
router.get('/:id/banks',  verifyToken, entityController.getExternalEntityBanks);
// router.post('/', verifyToken, entityController.createEntity);
// router.put('/:id',  verifyToken, entityController.updateEntity);
// router.delete('/:id',   verifyToken, entityController.deleteEntity);

// Get entity detail including specific employees
// router.get('/:entity_id', entityController.getEmployeeEntities);


// Updates
const { validateEntity, validateEntityUpdate } = require('../validations/entityValidation');

// Create an entity
router.post('/', validateEntity, entityController.createEntity);
router.get('/', verifyToken, entityController.getAllEntities);
// router.get('/:id', entityController.getEntityById);
router.patch('/:id', validateEntityUpdate, entityController.updateEntity);
router.delete('/:id', entityController.deleteEntity);

module.exports = router;
