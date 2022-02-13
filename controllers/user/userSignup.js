const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const { User, schemas } = require("../../models/user");
const gravatar = require("gravatar");

const userSignup = async (req, res, next) => {
  try {
    const { error } = schemas.register.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw createError(409, "Email in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const avatarUrl = gravatar.url(email, { s: "250" });

    await User.create({ email, avatarUrl, password: hashedPassword });

    res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = userSignup;
