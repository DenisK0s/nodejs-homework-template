const { Contact } = require("../../models/contact");

const getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, favorite} = req.query;
    const skip = (page - 1) * limit;
    const { _id } = req.user;

    const contacts = await Contact.find({ owner: _id }, "-createdAt -updatedAt", {
      skip,
      limit: Number(limit),
    }).populate("owner", "email");

    const favoriteContacts = await Contact.find({ owner: _id, favorite: favorite }, "-createdAt -updatedAt", {
      skip,
      limit: Number(limit),
    }).populate("owner", "email");

    const result = favorite ? favoriteContacts : contacts;

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts