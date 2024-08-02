const { body, validationResult } = require('express-validator');

exports.validateUser = [
  body('username').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('displayName').notEmpty().withMessage('Display name is required'),
  body('phone').isMobilePhone().withMessage('Invalid phone number'),
  body('password').isStrongPassword().withMessage('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateUserLogin = [
  body('username').notEmpty().withMessage('Name is required'),
  body('password').isStrongPassword().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateUserUpdate = [
  body('username').optional().notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Invalid email address'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  body('password').optional().isStrongPassword().withMessage('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];