const getCurrentUser = async (req, res, next) => {
  res.json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
};

module.exports = getCurrentUser;
