// validations/accountValidation.js
const { body, validationResult } = require('express-validator');

exports.validateAccount = [
  body('name').notEmpty().withMessage('Account name is required').isString(),
  body('idOperator').notEmpty().withMessage('Operator ID is required'),
  body('idEntity').optional().notEmpty().withMessage('Entity ID cannot be empty'),
  body('idEmployee').optional().notEmpty().withMessage('Employee ID cannot be empty'),
  body('idExternalEntity').optional().notEmpty().withMessage('External Entity ID cannot be empty'),
  body('amount').optional().isFloat({ min: 0 }).withMessage('Amount must be a non-negative number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateAccountUpdate = [
  body('name').optional().notEmpty().withMessage('Account name cannot be empty').isString(),
  body('idOperator').optional().notEmpty().withMessage('Operator ID cannot be empty'),
  body('idEntity').optional().notEmpty().withMessage('Entity ID cannot be empty'),
  body('idEmployee').optional().notEmpty().withMessage('Employee ID cannot be empty'),
  body('idExternalEntity').optional().notEmpty().withMessage('External Entity ID cannot be empty'),
  body('amount').optional().isFloat({ min: 0 }).withMessage('Amount must be a non-negative number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];