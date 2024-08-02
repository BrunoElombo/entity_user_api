// validations/entityValidation.js
const { body, validationResult } = require('express-validator');

exports.validateEntity = [
  body('raison_social').notEmpty().withMessage('Raison sociale is required'),
  body('Sigle').optional().notEmpty().withMessage('Sigle cannot be empty'),
  body('logo').optional().isURL().withMessage('Logo must be a valid URL'),
  body('niu').optional().notEmpty().withMessage('NIU cannot be empty'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateEntityUpdate = [
  body('raison_social').optional().notEmpty().withMessage('Raison sociale cannot be empty'),
  body('Sigle').optional().notEmpty().withMessage('Sigle cannot be empty'),
  body('logo').optional().isURL().withMessage('Logo must be a valid URL'),
  body('niu').optional().notEmpty().withMessage('NIU cannot be empty'),
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];