// validations/bankValidation.js
const { body, validationResult } = require('express-validator');

exports.validateBank = [
  body('name').notEmpty().withMessage('Bank name is required'),
  body('sigle').notEmpty().withMessage('Bank sigle is required'),
  body('Acronyme').notEmpty().withMessage('Bank acronyme is required'),
  body('displayName').notEmpty().withMessage('Display name is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateBankUpdate = [
  body('name').optional().notEmpty().withMessage('Bank name cannot be empty'),
  body('sigle').optional().notEmpty().withMessage('Bank sigle cannot be empty'),
  body('Acronyme').optional().notEmpty().withMessage('Bank acronyme cannot be empty'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];