const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const register = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionStatus = Joi.object({
  subscription: Joi.any().valid("starter", "pro", "business"),
});

const User = model("user", userSchema);

module.exports = {
  User,
  schemas: {
    register,
    updateSubscriptionStatus,
  },
};
