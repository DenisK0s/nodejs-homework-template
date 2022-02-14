const createError = require("http-errors");
const { User, schemas } = require("../../models/user");

const updateUserSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    const { error } = schemas.updateSubscriptionStatus.validate({
      subscription,
    });
    if (error) {
      throw createError(400, "Wrong subscription status !");
    }
    const result = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateUserSubscription;
