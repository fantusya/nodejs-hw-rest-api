const Joi = require("joi");

const addContact = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .min(2)
    .max(30)
    .required(),
});

module.exports = addContact;
