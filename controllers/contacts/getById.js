const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.findOne({ _id: contactId, owner: _id });
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.json(result);
};

module.exports = getById;
