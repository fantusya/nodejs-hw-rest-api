const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  // console.log(favorite);

  const filters = { owner: _id };
  if (favorite) filters.favorite = favorite;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find(filters, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");

  // if (contacts.length === 0) {
  //   res.json({ message: `no contacts with such query parameters` });
  // }

  res.json(contacts);
};

module.exports = getAll;
