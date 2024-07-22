// validations/departmentValidation.js
const { body, validationResult } = require('express-validator');

exports.validateDepartment = [
  body('id_entity').notEmpty().withMessage('Entity ID is required'),
  body('name').notEmpty().withMessage('Department name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('budget').optional().isFloat({ min: 0 }).withMessage('Budget must be a non-negative number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateDepartmentUpdate = [
  body('id_entity').optional().notEmpty().withMessage('Entity ID cannot be empty'),
  body('name').optional().notEmpty().withMessage('Department name cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('budget').optional().isFloat({ min: 0 }).withMessage('Budget must be a non-negative number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];