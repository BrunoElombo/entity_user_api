// validations/operatorValidation.js
const { body, validationResult } = require('express-validator');

exports.validateOperator = [
  body('name').notEmpty().withMessage('Operator name is required'),
  body('displayName').notEmpty().withMessage('Display name is required'),
  body('type').optional().isIn(['MOBILE', 'OTHER_TYPE']).withMessage('Type must be either MOBILE or OTHER_TYPE'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateOperatorUpdate = [
  body('name').optional().notEmpty().withMessage('Operator name cannot be empty'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  body('type').optional().isIn(['MOBILE', 'OTHER_TYPE']).withMessage('Type must be either MOBILE or OTHER_TYPE'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];