const { body, validationResult } = require('express-validator');

exports.validateEmployee = [
  body('id_level').notEmpty().withMessage('Employee level is required'),
  body('id_grade').notEmpty().withMessage('Employee grade is required'),
  body('id_user').notEmpty().withMessage('User ID is required'),
  body('id_entity').notEmpty().withMessage('Entity ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateEmployeeUpdate = [
  body('id_level').optional().notEmpty().withMessage('Employee level is required'),
  body('id_grade').optional().notEmpty().withMessage('Employee grade is required'),
  body('id_department').optional().notEmpty().withMessage('Department ID is required'),
  body('id_function').optional().notEmpty().withMessage('Function ID is required'),
  body('id_role').optional().notEmpty().withMessage('Role ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];