const { Conflict } = require("http-errors");
// const bcrypt = require("bcrypt");
const { User } = require("../../models");

const signup = async (req, res) => {
  const { password, email, subscription = "starter" } = req.body;
  console.log(subscription);
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const newUser = new User({ email, subscription });
  newUser.setPassword(password);
  newUser.save();

  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // const result = await User.create({ password: hashPassword, email, subscription,});

  res.status(201).json({ user: { email, subscription } });
};

module.exports = signup;
