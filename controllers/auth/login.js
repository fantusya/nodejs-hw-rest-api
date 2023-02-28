const dotenv = require("dotenv");
dotenv.config();

const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  // if (!user || !user.comparePassword(password)) {
  //   throw new Unauthorized(
  //     "Email is wrong or not verify, or password is wrong"
  //   );
  // }
  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new Unauthorized(
      "Email is wrong or not verify, or password is wrong"
    );
  }

  const { subscription, avatarURL, verify, verificationToken } = user;

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  
  res.json({
    token,
    user: {
      email,
      subscription,
      avatarURL,
      verify,
      verificationToken
    },
  });
};

module.exports = login;
