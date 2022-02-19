const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { User, schemas } = require("../../models/user");
const { sendMail } = require("../../helpers");

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
    const verificationToken = v4();
    await User.create({
      email,
      password: hashedPassword,
      avatarUrl,
      verificationToken,
    });
    const mail = {
      to: email,
      subject: "email confirmation",
      html: `< a target="_blank" href="http://localhost:4000/api/users/verify/${verificationToken}" /> follow the link to confirm !`,
    };
    await sendMail(mail);
    res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
      message:
        "The email of mandatory verification is already in your mailbox ! ",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = userSignup;
