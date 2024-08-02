// validations/externalEntityValidation.js
const { body, validationResult } = require('express-validator');

exports.validateExternalEntity = [
  body('name').notEmpty().withMessage('Name is required'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  // body('id_external_entity').notEmpty().withMessage('External entity id cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateExternalEntityUpdate = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('id_entity').optional().notEmpty().withMessage('Entity ID cannot be empty'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];