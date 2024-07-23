// validations/employeeRoleValidation.js
const { body, validationResult } = require('express-validator');

exports.validateEmployeeRole = [
  body('id_employee').notEmpty().withMessage('Employee ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateEmployeeRoleUpdate = [
  body('id_employee').optional().notEmpty().withMessage('Employee ID cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];