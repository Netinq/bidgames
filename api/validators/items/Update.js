const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
  description: Joi.string().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
  virtual: Joi.boolean().empty().messages({
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
  user_uuid: Joi.string().guid().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
  sold: Joi.boolean().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
  sold_at: Joi.date().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
});

module.exports = schema;
