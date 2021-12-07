const Joi = require("@hapi/joi");

const schema = Joi.object({
  flash: Joi.boolean().required().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
  start_date: Joi.date().required().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
  end_date: Joi.date().required().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
  user_uuid: Joi.string().guid().required().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
});

module.exports = schema;
