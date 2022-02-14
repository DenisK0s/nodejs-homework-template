const getContacts = require("./getContacts");
const getContactById = require("./getContactById");
const createContact = require("./createContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");
const deleteContact = require("./deleteContact");

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  updateFavorite,
  deleteContact,
};
