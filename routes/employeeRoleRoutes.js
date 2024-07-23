// routes/employeeRoleRoutes.js
const express = require('express');
const router = express.Router();
const employeeRoleController = require('../controllers/employeeRoleController');
const { validateEmployeeRole, validateEmployeeRoleUpdate } = require('../validations/employeeRoleValidation');

router.post('/', validateEmployeeRole, employeeRoleController.createEmployeeRole);
router.get('/', employeeRoleController.getAllEmployeeRoles);
router.get('/:id', employeeRoleController.getEmployeeRoleById);
router.patch('/:id', validateEmployeeRoleUpdate, employeeRoleController.updateEmployeeRole);
router.delete('/:id', employeeRoleController.deleteEmployeeRole);

module.exports = router;