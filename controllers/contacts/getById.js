const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id); // findOne({_id: id})
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.json(result);
};

module.exports = getById;
