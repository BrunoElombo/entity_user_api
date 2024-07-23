// controllers/employeeRoleController.js
const employeeRoleService = require('../services/employeeRoleService');

exports.createEmployeeRole = async (req, res) => {
  try {
    const employeeRole = await employeeRoleService.createEmployeeRole(req.body);
    res.status(201).json(employeeRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllEmployeeRoles = async (req, res) => {
  try {
    const employeeRoles = await employeeRoleService.getAllEmployeeRoles();
    res.json(employeeRoles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeRoleById = async (req, res) => {
  try {
    const employeeRole = await employeeRoleService.getEmployeeRoleById(req.params.id);
    res.json(employeeRole);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateEmployeeRole = async (req, res) => {
  try {
    const employeeRole = await employeeRoleService.updateEmployeeRole(req.params.id, req.body);
    res.json(employeeRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEmployeeRole = async (req, res) => {
  try {
    await employeeRoleService.deleteEmployeeRole(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};