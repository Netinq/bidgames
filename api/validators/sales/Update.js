const Joi = require("@hapi/joi");

const schema = Joi.object({
  flash: Joi.boolean().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
  }),
  start_date: Joi.date().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
  }),
  end_date: Joi.date().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
  }),
  user_uuid: Joi.string().guid().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
  }),
});

module.exports = schema;
