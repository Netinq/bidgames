const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().required().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
  description: Joi.string().required().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
  isvirtual: Joi.boolean().required().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
  min_age: Joi.number().integer().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
  price: Joi.number().integer().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
  need_estime: Joi.boolean().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
});

module.exports = schema;
