const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import role-related actions
const { browse, read, add } = require("../../../controllers/roleActions");

// Route to get a list of roles
router.get("/", browse);

// Route to get a specific role by ID
router.get("/:id", read);

// Route to add a new role
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
