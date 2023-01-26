const { Contact } = require("../models");
const { NotFound } = require("http-errors");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.json(result);
};

// === without ctrlWrapper
// const updateById = async (req, res, next) => {
//   try {
//     // const { error } = schemas.updateContact.validate(req.body);
//     // if (error) {
//     //   throw new BadRequest("Missing required name field");
//     // }
//     const { id } = req.params;
//     const result = await contactsOperations.updateContact(id, req.body);
//     if (!result) {
//       throw new NotFound(`Not found`);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = updateById;
