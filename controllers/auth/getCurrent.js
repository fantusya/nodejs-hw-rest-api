// const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { email, subscription, avatarURL, verify, verificationToken } = req.user;

  res.json({ email, subscription, avatarURL, verify, verificationToken });
};

module.exports = getCurrent;
