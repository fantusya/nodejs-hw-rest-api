const { NotFound, BadRequest } = require("http-errors");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("Email is wrong");
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const mailBody = {
    to: email,
    subject: "Confirm Your Email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click here to confirm your email.</a>`,
    // html: `<a target="_blank" href="https://my-phonebook-app.herokuapp.com/api/users/verify/${user.verificationToken}">Click here to confirm your email.</a>`,
  };
  await sendEmail(mailBody);

  res.json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
