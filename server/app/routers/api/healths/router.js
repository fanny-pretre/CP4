const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import health-related actions
const { browse, read, add } = require("../../../controllers/healthActions");

// Route to get a list of healths
router.get("/", browse);

// Route to get a specific health by ID
router.get("/:id", read);

// Route to add a new health
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
