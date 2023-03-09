const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { name, password, email, subscription = "starter" } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use. Try another one.");
  }

  const verificationToken = v4();
  const avatarURL = gravatar.url(email, { s: "50" });

  const newUser = new User({
    name,
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
    // html: `<a target="_blank" href="https://my-phonebook-app.herokuapp.com/api/users/verify/${verificationToken}">Click here to confirm your email.</a>`,
  };
  await sendEmail(mailBody);

  res.status(201).json({
    name,
    email,
    subscription,
    avatarURL,
  });
};

module.exports = signup;
