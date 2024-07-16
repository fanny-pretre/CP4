const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import cohabitation-related actions
const {
  browse,
  read,
  add,
} = require("../../../controllers/cohabitationActions");

// Route to get a list of cohabitations
router.get("/", browse);

// Route to get a specific cohabitation by ID
router.get("/:id", read);

// Route to add a new cohabitation
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
