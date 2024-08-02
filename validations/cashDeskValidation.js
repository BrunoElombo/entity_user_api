// validations/cashDeskValidation.js
const { body, validationResult } = require('express-validator');

exports.validateCashDesk = [
  body('name').notEmpty().withMessage('Cash desk name is required'),
  body('idEntity').notEmpty().withMessage('Entity ID is required'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  body('amount').optional().isFloat({ min: 0 }).withMessage('Amount must be a non-negative number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateCashDeskUpdate = [
  body('name').optional().notEmpty().withMessage('Cash desk name cannot be empty'),
  body('idEntity').optional().notEmpty().withMessage('Entity ID cannot be empty'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  body('amount').optional().isFloat({ min: 0 }).withMessage('Amount must be a non-negative number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];