// validations/typeEntityValidation.js
const { body, validationResult } = require('express-validator');

exports.validateTypeEntity = [
  body('id_entity').notEmpty().withMessage('Entity ID is required'),
  body('id_type').notEmpty().withMessage('Type ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateTypeEntityUpdate = [
  body('id_entity').optional().notEmpty().withMessage('Entity ID cannot be empty'),
  body('id_type').optional().notEmpty().withMessage('Type ID cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];