// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all animals from the database
    const animals = await tables.animal.readAll();

    // Respond with the animals in JSON format
    res.json(animals);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific animal from the database based on the provided ID
    const animal = await tables.animal.read(req.params.id);

    // If the animal is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the animal in JSON format
    if (animal == null) {
      res.sendStatus(404);
    } else {
      res.json(animal);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the animal data from the request body
  const animal = req.body;

  try {
    // Insert the animal into the database
    const insertId = await tables.animal.create(animal);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted animal
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  // destroy,
};
