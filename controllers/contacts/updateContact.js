const { Contact, schemas } = require("../../models/contact");
const createError = require("http-errors");

const updateContact = async (req, res, next) => {
  try {
    const { error } = schemas.addContact.validate(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = updateContact;