const { NotFound } = require("http-errors");
const { User } = require("../../models");
const path = require("path");

const htmlDir = path.resolve("responseHtml", "index.html");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new NotFound("User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  // res.redirect(`http://localhost:3001/goit-react-hw-08-phonebook/login`);
  res.sendFile(htmlDir);

  // res.redirect(
  //   `https://fantusya.github.io/goit-react-hw-08-phonebook/goit-react-hw-08-phonebook/login`
  // );
};

module.exports = verifyEmail;
