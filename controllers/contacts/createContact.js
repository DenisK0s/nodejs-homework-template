const { Contact, schemas } = require("../../models/contact");
const createError = require("http-errors");

const createContact = async (req, res, next) => {
  try {
    const { error } = schemas.addContact.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const data = { ...req.body, owner: req.user._id };
    const result = await Contact.create(data);
    res.status(201).json(result);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
  }
}

module.exports = createContact;