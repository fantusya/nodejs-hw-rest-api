const { Contact } = require("../models");
const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id); // findOne({_id: id})
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.json(result);
};

// === without ctrlWrapper
// const getById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contactsOperations.getContactById(id);
//     if (!result) {
//       // --- using http-errors obj ---
//       throw new NotFound(`Not found`);

//       // --- using http-errors ---
//       // throw createError(404, `Not found`);

//       // --- without http-errors ---
//       // const error = new Error(`Not found`);
//       // error.status = 404;
//       // throw error;
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = getById;
