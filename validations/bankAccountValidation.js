const { body, validationResult } = require('express-validator');

const validateBankAccount = [
    body('account_number').isString().notEmpty().withMessage('Account number is required'),
    body('amount').isString().notEmpty().withMessage('Amount is required'),
    body('cardNumber').optional().isString(),
    body('id_employee').optional().isString(),
    body('id_entity').optional().isString(),
    body('id_external_entity').optional().isString(),
    body('id_bank').isString().notEmpty().withMessage('Bank ID is required'),
    body('isActive').optional().isBoolean(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateBankAccount
};