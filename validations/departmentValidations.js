// validations/departmentValidation.js
const Joi = require('joi');

exports.createDepartmentSchema = Joi.object({
  isActive: Joi.boolean().required(),
  id_entity: Joi.string().required(),
  name: Joi.string().required(),
  displayName: Joi.string().optional(),
  description: Joi.string().required(),
  budget: Joi.number().optional(),
  id_employee: Joi.string().optional(),
  id_user: Joi.string().optional(),
});

exports.updateDepartmentSchema = Joi.object({
  isActive: Joi.boolean().optional(),
  id_entity: Joi.string().optional(),
  name: Joi.string().optional(),
  displayName: Joi.string().optional(),
  description: Joi.string().optional(),
  budget: Joi.number().optional(),
  id_employee: Joi.string().optional(),
  id_user: Joi.string().optional(),
});
