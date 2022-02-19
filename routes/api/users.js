const express = require("express");

const ctrls = require("../../controllers/user");
const {
  authenticate,
  upload,
  avatarSizeCorrector,
} = require("../../middlewares");

const router = express.Router();

// /api/users/signup
router.post("/signup", ctrls.userSignup);

// /api/users/login
router.post("/login", ctrls.userSignin);

// /api/users/logout
router.get("/logout", authenticate, ctrls.userLogout);

// /api/users
router.patch("/", authenticate, ctrls.updateUserSubscription);

// /api/users/avatars
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  avatarSizeCorrector,
  ctrls.updateUserAvatar
);

// /api/users/current
router.get("/current", authenticate, ctrls.getCurrentUser);

// /api/users/verify
router.post("/verify", ctrls.reVerifyUser);

// /api/users/verify/:verificationToken
router.get("/verify/:verificationToken", ctrls.verifyUserByEmail);

module.exports = router;
