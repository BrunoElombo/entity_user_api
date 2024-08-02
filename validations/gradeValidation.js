// validations/gradeValidation.js
const { body, validationResult } = require('express-validator');

exports.validateGrade = [
  body('name').notEmpty().withMessage('Grade name is required'),
  body('power').optional().isInt({ min: 0 }).withMessage('Power must be a non-negative integer'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateGradeUpdate = [
  body('name').optional().notEmpty().withMessage('Grade name cannot be empty'),
  body('power').optional().isInt({ min: 0 }).withMessage('Power must be a non-negative integer'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];