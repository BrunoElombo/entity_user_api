const { body, validationResult } = require('express-validator');

exports.validateSite = [
  body('name').notEmpty().withMessage('Name is required'),
  body('id_entity').notEmpty().withMessage('Entity ID is required'),
  body('type').optional().isIn(['ONFIELD', 'HEADQUARTER']).withMessage('Type must be either ONFIELD or HEADQUARTER'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateSiteUpdate = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('id_entity').optional().notEmpty().withMessage('Entity ID cannot be empty'),
  body('type').optional().isIn(['ONFIELD', 'HEADQUARTER']).withMessage('Type must be either ONFIELD or HEADQUARTER'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];