const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.findByIdAndDelete({
    _id: contactId,
    owner: _id,
  });
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = removeById;
