// validations/bankAccountValidation.js
const { body, validationResult } = require('express-validator');

exports.validateBankAccount = [
  body('account_number').notEmpty().withMessage('Account number is required'),
  body('amount').notEmpty().withMessage('Amount is required').isFloat({ min: 0 }).withMessage('Amount must be a non-negative number'),
  body('id_bank').notEmpty().withMessage('Bank ID is required'),
  body('id_employee').optional().notEmpty().withMessage('Employee ID cannot be empty'),
  body('id_entity').optional().notEmpty().withMessage('Entity ID cannot be empty'),
  body('id_external_entity').optional().notEmpty().withMessage('External Entity ID cannot be empty'),
  body('cardNumber').optional().notEmpty().withMessage('Card number cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateBankAccountUpdate = [
  body('account_number').optional().notEmpty().withMessage('Account number cannot be empty'),
  body('amount').optional().isFloat({ min: 0 }).withMessage('Amount must be a non-negative number'),
  body('id_bank').optional().notEmpty().withMessage('Bank ID cannot be empty'),
  body('id_employee').optional().notEmpty().withMessage('Employee ID cannot be empty'),
  body('id_entity').optional().notEmpty().withMessage('Entity ID cannot be empty'),
  body('id_external_entity').optional().notEmpty().withMessage('External Entity ID cannot be empty'),
  body('cardNumber').optional().notEmpty().withMessage('Card number cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];