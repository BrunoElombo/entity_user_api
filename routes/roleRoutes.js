// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const verifyJWT = require('../middlewares/verifyJWT');
const { validateRole, validateRoleUpdate } = require('../validations/roleValidation');

router.post('/', validateRole, roleController.createRole);
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);
router.patch('/:id', validateRoleUpdate, roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;