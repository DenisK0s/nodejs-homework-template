const Jimp = require("jimp");

const avatarSizeCorrector = (req, _, next) => {
  const { path } = req.file;
  Jimp.read(path)
    .then((avatar) => {
      avatar.resize(250, 250).write(path, () => {
        next();
      });
    })
    .catch(() => {
      throw new Error("Unsuccessful avatar resizing!");
    });
};

module.exports = avatarSizeCorrector;
