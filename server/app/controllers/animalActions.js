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

// The B of BREAD - Browse (Read All) operation
const browseAdoptable = async (req, res, next) => {
  try {
    // Fetch all animals from the database
    const animals = await tables.animal.readAllAdoptable();

    // Respond with the animals in JSON format
    res.json(animals);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The B of BREAD - Browse (Read All) operation
const browseAdopted = async (req, res, next) => {
  try {
    // Fetch all animals from the database
    const animals = await tables.animal.readAllAdopted();

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
const edit = async (req, res, next) => {
  // Extract the animal data from the request body and params
  const animal = { ...req.body, id: req.params.id };
  try {
    // Update the animal in the database
    await tables.animal.update(animal);
    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.sendStatus(520);
    next(err);
  }
};

const add = async (req, res, next) => {
  const animal = req.body;

  try {
    // Vérifiez que les données de santé sont présentes et non vides

    // Insertion dans la table health
    const cohabitationId = await tables.cohabitation.create({
      human: animal.human,
      cat: animal.cat,
      dog: animal.dog,
    });

    // Insertion dans la table health
    const healthId = await tables.health.create({
      sterilisation: animal.sterilisation,
      vaccination: animal.vaccination,
      identification: animal.identification,
      decontamination: animal.decontamination,
      background: animal.background,
      observations: animal.observations,
    });

    // Insertion dans la table animal
    const insertId = await tables.animal.create({
      image: animal.image,
      name: animal.name,
      age: animal.age,
      gender: animal.gender,
      story: animal.story,
      coming_date: animal.coming_date,
      status: animal.status,
      personality: animal.personality,
      adoption_date: animal.adoption_date,
      race_id: animal.race_id,
      health_id: healthId,
      cohabitation_id: cohabitationId,
    });

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the animal from the database

    await tables.animal.delete(req.params.id);

    // Respond with HTTP 204 (No Content)

    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware

    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  browseAdoptable,
  browseAdopted,
  read,
  edit,
  add,
  destroy,
};
