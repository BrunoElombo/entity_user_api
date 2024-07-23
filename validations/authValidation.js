const { body, validationResult } = require('express-validator');

exports.validateUserLogin = [
    body('name').notEmpty().withMessage('Name is required'),
    body('password').isStrongPassword().withMessage('Password is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];