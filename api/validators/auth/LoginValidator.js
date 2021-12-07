const Joi = require("@hapi/joi");

const schema = Joi.object({
  email: Joi.string().required().email().empty().messages({
    "string.base": `Le champ est invalide`,
    "string.empty": `Le champ ne peut pas être vide`,
    "string.email": `Le champ doit être une adresse email`,
    "any.required": `Le champ est requis`,
  }),
  password: Joi.string().required().empty().messages({
    "string.base": `Le champ est invalide`,
    "string.empty": `Le champ ne peut pas être vide`,
    "any.required": `Le champ est requis`,
  }),
});

module.exports = schema;
