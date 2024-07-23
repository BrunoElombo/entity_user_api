// validations/productValidation.js
const { body, validationResult } = require('express-validator');

exports.validateProduct = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('id_entity').notEmpty().withMessage('Entity ID is required'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  body('unit').optional().isFloat({ min: 0 }).withMessage('Unit must be a non-negative number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateProductUpdate = [
  body('name').optional().notEmpty().withMessage('Product name cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('id_entity').optional().notEmpty().withMessage('Entity ID cannot be empty'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  body('unit').optional().isFloat({ min: 0 }).withMessage('Unit must be a non-negative number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];