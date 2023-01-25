const { Contact } = require("../models");

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// === without ctrlWrapper
// const add = async (req, res, next) => {
//   try {
//     // const { error } = schemas.addContact.validate(req.body);
//     // if (error) {
//     //   throw new BadRequest("Missing required name field");
//     // }
//     const result = await contactsOperations.addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = add;
