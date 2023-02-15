const { User } = require("../../models");
const { NotFound } = require("http-errors");

const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.json(result);
};

module.exports = updateSubscription;
