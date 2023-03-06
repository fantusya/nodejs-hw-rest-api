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
  const avatarURL = gravatar.url(email, { s: "50" });

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
    html: `<a target="_blank" href="https://my-phonebook-app.herokuapp.com/api/users/verify/${verificationToken}">Click here to confirm your email.</a>`,
  };
  await sendEmail(mailBody);

  res
    .status(201)
    .json({
      email,
      subscription,
      avatarURL,
      verificationToken,
      verify: newUser.verify,
    });
};

module.exports = signup;
