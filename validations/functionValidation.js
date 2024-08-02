// validations/functionValidation.js
const { body, validationResult } = require('express-validator');

exports.validateFunction = [
  body('name').notEmpty().withMessage('Function name is required'),
  body('displayName').notEmpty().withMessage('Display name cannot be empty'),
  body('power').optional().isInt({ min: 0 }).withMessage('Power must be a non-negative integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateFunctionUpdate = [
  body('name').optional().notEmpty().withMessage('Function name cannot be empty'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  body('power').optional().isInt({ min: 0 }).withMessage('Power must be a non-negative integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];