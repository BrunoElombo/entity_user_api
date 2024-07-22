// validations/roleValidation.js
const { body, validationResult } = require('express-validator');

exports.validateRole = [
  body('name').notEmpty().withMessage('Role name is required'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  body('power').isInt({ min: 0 }).withMessage('Power must be a non-negative integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateRoleUpdate = [
  body('name').optional().notEmpty().withMessage('Role name cannot be empty'),
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