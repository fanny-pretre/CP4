const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import animal-related actions
const { browse, read, add } = require("../../../controllers/animalActions");

// Route to get a list of animals
router.get("/", browse);

// Route to get a specific animal by ID
router.get("/:id", read);

// Route to add a new animal
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
