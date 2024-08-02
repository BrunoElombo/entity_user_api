// validations/currencyCutsValidation.js
const { body, validationResult } = require('express-validator');

exports.validateCurrencyCuts = [
  body('value').isFloat().withMessage('Value must be a number'),
  body('type').notEmpty().withMessage('Currency type is required'),
  body('currencyId').notEmpty().withMessage('Currency ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateCurrencyCutsUpdate = [
  body('value').optional().isFloat().withMessage('Value must be a number'),
  body('type').optional().notEmpty().withMessage('Currency type cannot be empty'),
  body('currencyId').optional().notEmpty().withMessage('Currency ID cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];