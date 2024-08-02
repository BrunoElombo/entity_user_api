// routes/typeEntityRoutes.js
const express = require('express');
const router = express.Router();
const typeEntityController = require('../controllers/typeEntityController');
const { validateTypeEntity, validateTypeEntityUpdate } = require('../validations/typeEntityValidation');

router.post('/', validateTypeEntity, typeEntityController.createTypeEntity);
router.get('/', typeEntityController.getAllTypeEntities);
router.get('/:id', typeEntityController.getTypeEntityById);
router.patch('/:id', validateTypeEntityUpdate, typeEntityController.updateTypeEntity);
router.delete('/:id', typeEntityController.deleteTypeEntity);

module.exports = router;