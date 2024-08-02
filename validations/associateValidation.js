// validations/associerValidation.js
const { body, validationResult } = require('express-validator');

exports.validateAssociate = [
  body('id_entity').notEmpty().withMessage('Entity ID is required'),
  body('id_external_entity').notEmpty().withMessage('External Entity ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateAssociateUpdate = [
  body('id_entity').optional().notEmpty().withMessage('Entity ID cannot be empty'),
  body('id_external_entity').optional().notEmpty().withMessage('External Entity ID cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];