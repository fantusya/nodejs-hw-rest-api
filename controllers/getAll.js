const { Contact } = require("../models");

const getAll = async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
};

// === without ctrlWrapper
// const getAll = async (req, res, next) => {
//   try {
//     const contacts = await contactsOperations.listContacts();
//     res.json(contacts);
//   } catch (error) {
//     next(error);
//     // res.status(500).json({
//     //   status: "error",
//     //   code: 500,
//     //   message: "Server error",
//     // });
//   }
// };

module.exports = getAll;
