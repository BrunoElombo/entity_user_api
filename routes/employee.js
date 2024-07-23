const express = require("express");
const employeeRouter = express.Router()
const employeeController = require("../controllers/employeeController")
const verifyJWT = require("../middlewares/verifyJWT")


employeeRouter.get('/hierarchy', verifyJWT, employeeController.getEmployeeHierarchy);
employeeRouter.get('/mandatory', verifyJWT, employeeController.getEmployeeMandatory);
employeeRouter.get('/controllers', verifyJWT, employeeController.getEmployeeControllers);
employeeRouter.get('/:employeeId/colleagues', verifyJWT, employeeController.getEmployeeColleagues);
employeeRouter.get('/:entity_id/entities', verifyJWT, employeeController.getEmployeeEntities);
employeeRouter.get('/:id/banks', verifyJWT, employeeController.getEmployeeBanks)
employeeRouter.get('/', employeeController.getEmployeeByEntity);

// Updates
// const employeeController = require('../controllers/employeeController');
const { validateEmployee, validateEmployeeUpdate } = require('../validations/employeeValidation');

employeeRouter.post('/', validateEmployee, employeeController.createEmployee);
employeeRouter.get('/profile', employeeController.getEmployeeProfile);
employeeRouter.put('/update', validateEmployeeUpdate, employeeController.updateEmployeeProfile);
employeeRouter.delete('/delete', employeeController.deleteEmployee);


module.exports = employeeRouter;