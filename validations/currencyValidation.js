// validations/currencyValidation.js
const { body, validationResult } = require('express-validator');

exports.validateCurrency = [
  body('code').notEmpty().withMessage('Currency code is required'),
  body('name').notEmpty().withMessage('Currency name is required'),
  body('symbol').notEmpty().withMessage('Currency symbol is required'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateCurrencyUpdate = [
  body('code').optional().notEmpty().withMessage('Currency code cannot be empty'),
  body('name').optional().notEmpty().withMessage('Currency name cannot be empty'),
  body('symbol').optional().notEmpty().withMessage('Currency symbol cannot be empty'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];