const dotenv = require("dotenv");
dotenv.config();

const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }
  //   if (!user) {
  //     throw new Unauthorized("Email not found");
  //   }

  //   const passCompare = bcrypt.compareSync(password, user.password);
  //   if (!passCompare) {
  //     throw new Unauthorized("Password is wrong");
  //   }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
