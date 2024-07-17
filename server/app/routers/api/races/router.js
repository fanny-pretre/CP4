const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import race-related actions
const { browse, read, add } = require("../../../controllers/raceActions");

// Route to get a list of races
router.get("/", browse);

// Route to get a specific race by ID
router.get("/:id", read);

// Route to add a new race
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
