// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all healths from the database
    const healths = await tables.health.readAll();

    // Respond with the healths in JSON format
    res.json(healths);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific health from the database based on the provided ID
    const health = await tables.health.read(req.params.id);

    // If the health is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the health in JSON format
    if (health == null) {
      res.sendStatus(404);
    } else {
      res.json(health);
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
  // Extract the health data from the request body
  const health = req.body;

  try {
    // Insert the health into the database
    const insertId = await tables.health.create(health);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted health
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
