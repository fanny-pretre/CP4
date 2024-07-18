const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./items/router");

router.use("/items", itemsRouter);

// Auths
const authsRouter = require("./auths/router");

router.use("/auths", authsRouter);

// Roles
const rolesRouter = require("./roles/router");

router.use("/roles", rolesRouter);

// Races
const racesRouter = require("./races/router");

router.use("/races", racesRouter);

// Healths
const healthsRouter = require("./healths/router");

router.use("/healths", healthsRouter);

// Cohabitations
const cohabitationsRouter = require("./cohabitations/router");

router.use("/cohabitations", cohabitationsRouter);

// Users
const usersRouter = require("./users/router");

router.use("/users", usersRouter);

// Animals
const animalsRouter = require("./animals/router");

router.use("/animals", animalsRouter);

// Contact
const contactsRouter = require("./contacts/router");

router.use("/contacts", contactsRouter);

/* ************************************************************************* */

module.exports = router;
