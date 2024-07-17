// controllers/departmentController.js
const departmentService = require('../services/departmentServices');
const { createDepartmentSchema, updateDepartmentSchema } = require('../validations/departmentValidations');

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await departmentService.getAllDepartments();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await departmentService.getDepartmentById(id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const { error, value } = createDepartmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const department = await departmentService.createDepartment(value);
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = updateDepartmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedDepartment = await departmentService.updateDepartment(id, value);
    if (!updatedDepartment) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDepartment = await departmentService.deleteDepartment(id);
    if (!deletedDepartment) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

