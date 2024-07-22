// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { validateRole, validateRoleUpdate } = require('../validations/roleValidation');

router.post('/create', validateRole, roleController.createRole);
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);
router.put('/:id', validateRoleUpdate, roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;