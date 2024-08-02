const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { validateDepartment, validateDepartmentUpdate } = require('../validations/departmentValidation');
const { verifyToken } = require('../middlewares/verifyJWT');

router.post('/', validateDepartment, departmentController.createDepartment);
router.get('/', departmentController.getAllDepartments);
router.get('/:id', departmentController.getDepartmentById);
router.patch('/:id', validateDepartmentUpdate, departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
  