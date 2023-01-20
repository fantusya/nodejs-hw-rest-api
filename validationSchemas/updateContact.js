const Joi = require("joi");

const updateContact = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string(),
  phone: Joi.string()
    .pattern(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .min(2)
    .max(30),
});

module.exports = updateContact;
