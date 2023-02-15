const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const { favorite } = req.body;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.json(result);
};

module.exports = updateFavorite;
