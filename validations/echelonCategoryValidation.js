// validations/echelonCategoryValidation.js
const { body, validationResult } = require('express-validator');

exports.validateEchelonCategory = [
  body('name').notEmpty().withMessage('Name is required'),
  body('displayName').notEmpty().withMessage('displayName is required'),
  body('category').notEmpty().isAlpha().isLength({ max : 1, min : 1}).withMessage('Category should be a letter between A-Z'),
  body('power').optional().isInt({ min: 0 }).withMessage('Power must be a non-negative integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateEchelonCategoryUpdate = [
    body('name').notEmpty().withMessage('Name is required'),
    body('displayName').notEmpty().withMessage('displayName is required'),
    body('category').notEmpty().isAlpha().isLength({ max : 1, min : 1}).withMessage('Category should be a letter between A-Z'),
    body('power').optional().isInt({ min: 0 }).withMessage('Power must be a non-negative integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];