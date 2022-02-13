const express = require("express");
const router = express.Router();

const { authenticate } = require("../../middlewares");
const ctrls = require("../../controllers/contacts");

// /api/contacts
router.get("/", authenticate, ctrls.getContacts);

// /api/contacts/:contactId
router.get("/:contactId", ctrls.getContactById);

// /api/contacts
router.post("/", authenticate, ctrls.createContact);

// /api/contacts/:contactId
router.put("/:contactId", ctrls.updateContact);

// /api/contacts/:contactId/favorite
router.patch("/:contactId/favorite", ctrls.updateFavorite);

// /api/contacts/:contactId
router.delete("/:contactId", ctrls.deleteContact);

module.exports = router;
