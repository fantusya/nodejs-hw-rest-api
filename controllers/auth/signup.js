const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { password, email, subscription = "starter" } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const verificationToken = v4();
  const avatarURL = gravatar.url(email, { s: "250" });

  const newUser = new User({
    email,
    subscription,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  await newUser.save();

  const mailBody = {
    to: email,
    subject: "Confirm Your Email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click here to confirm your email.</a>`,
  };
  await sendEmail(mailBody);

  res
    .status(201)
    .json({ user: { email, subscription, avatarURL, verificationToken } });
};

module.exports = signup;
