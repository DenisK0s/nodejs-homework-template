const createError = require("http-errors");
const { User, schemas } = require("../../models/user");
const { sendMail } = require("../../helpers");

/* eslint-disable */
const reVerifyUser = async (req, res, next) => {
  try {
    const { error } = schemas.verifyEmailSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required fild email");
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user.verify) {
      throw createError(400, "Verification has already been passed");
    }
    const mail = {
      to: email,
      subject: "email confirmation",
      html: `< a target="_blank" href="http://localhost:4000/api/users/verify/${user.verificationToken}" /> follow the link to confirm !`,
    };
    await sendMail(mail);
    res.json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = reVerifyUser;
