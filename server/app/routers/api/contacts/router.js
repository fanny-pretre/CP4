const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import contact-related actions
const { browse, read, add } = require("../../../controllers/contactActions");

// Route to get a list of contacts
router.get("/", browse);

// Route to get a specific contact by ID
router.get("/:id", read);

// Route to add a new contact
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
