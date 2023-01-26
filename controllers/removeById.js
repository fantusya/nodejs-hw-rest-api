const { Contact } = require("../models");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.json({
    message: "Contact deleted",
  });
};

// === without ctrlWrapper
// const removeById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contactsOperations.removeContact(id);
//     if (!result) {
//       throw new NotFound(`Not found`);
//     }
//     res.json({
//       message: "Contact deleted",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = removeById;
