// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all contacts from the database
    const contacts = await tables.contact.readAll();

    // Respond with the contacts in JSON format
    res.json(contacts);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific contact from the database based on the provided ID
    const contact = await tables.contact.read(req.params.id);

    // If the contact is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the contact in JSON format
    if (contact == null) {
      res.sendStatus(404);
    } else {
      res.json(contact);
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
  // Extract the contact data from the request body
  const contact = req.body;

  try {
    // Insert the contact into the database
    const insertId = await tables.contact.create(contact);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted contact
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
