const Joi = require('joi');


exports.registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

exports.loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});