const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user.js");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateUserAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  try {
    const [extention] = filename.split(".").reverse();
    const newFileName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, newFileName);
    fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("avatars", newFileName);
    await User.findByIdAndUpdate(_id, { avatarUrl });
    res.json(avatarUrl);
  } catch (error) {
    next(error);
  }
};

module.exports = updateUserAvatar;
