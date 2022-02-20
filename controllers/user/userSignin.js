const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { User, schemas } = require("../../models/user");
const { SECRET_KEY } = process.env;
const bcrypt = require("bcryptjs");

const userSignin = async (req, res, next) => {
  try {
    const { error } = schemas.register.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw createError(401, "Email or password is wrong");
    }

    if (!user.verify) {
      throw createError(401, "Email not verify");
    }

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      throw createError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = userSignin;
