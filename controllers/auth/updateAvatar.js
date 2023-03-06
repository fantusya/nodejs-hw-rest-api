const dotenv = require("dotenv");
dotenv.config();
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

const { User } = require("../../models");
const fs = require("fs/promises");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const updateAvatar = async (req, res) => {
  const { path: tmpUpload } = req.file;
  const { _id: id } = req.user;
  try {
    const result = await cloudinary.uploader.upload(
      tmpUpload,
      {
        folder: "avatars",
        transformation: [
          { gravity: "face", height: 500, width: 500, crop: "crop" },
          { radius: "max" },
          { width: 60, height: 60, crop: "scale" },
        ],
      },
      (error, result) => {
        console.log("upload error", error);
        return result;
      }
    );

    const user = await User.findOne({ _id: id });
    if (user.idCloudAvatar) {
      await cloudinary.uploader.destroy(user.idCloudAvatar, (error, result) => {
        console.log("destroy error", error);
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        avatarURL: result.secure_url,
        idCloudAvatar: result.public_id,
      },
      { new: true }
    );
    await fs.unlink(tmpUpload);

    res.json({ avatarURL: updatedUser.avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = updateAvatar;
