const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import animal-related actions
const {
  browse,
  browseAdoptable,
  browseAdopted,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/animalActions");

// Route to get a list of animals
router.get("/", browse);

router.get("/adoption", browseAdoptable);

router.get("/adopted", browseAdopted);

// Route to get a specific animal by ID
router.get("/:id", read);

// Route to add a new animal
router.post("/", add);

router.put("/:id", edit);

router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
