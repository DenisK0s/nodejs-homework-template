const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const addContact = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9]+\s[a-zA-Z0-9]+$/)
    .required(),
  email: Joi.string()
    .pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
    .required(),
});

const updateFavoriteField = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas: {
    addContact,
    updateFavoriteField,
  },
};
