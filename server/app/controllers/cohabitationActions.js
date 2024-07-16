// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all cohabitations from the database
    const cohabitations = await tables.cohabitation.readAll();

    // Respond with the cohabitations in JSON format
    res.json(cohabitations);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific cohabitation from the database based on the provided ID
    const cohabitation = await tables.cohabitation.read(req.params.id);

    // If the cohabitation is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the cohabitation in JSON format
    if (cohabitation == null) {
      res.sendStatus(404);
    } else {
      res.json(cohabitation);
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
  // Extract the cohabitation data from the request body
  const cohabitation = req.body;

  try {
    // Insert the cohabitation into the database
    const insertId = await tables.cohabitation.create(cohabitation);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted cohabitation
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
