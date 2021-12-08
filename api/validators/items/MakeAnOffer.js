const Joi = require("@hapi/joi");

const schema = Joi.object({
  item_id: Joi.number().integer().required().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
  sale_uuid: Joi.string().guid().required().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
  price: Joi.number().integer().required().empty().messages({
    "any.base": `Le champ est invalide`,
    "any.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
});

module.exports = schema;
