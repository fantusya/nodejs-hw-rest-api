const express = require("express");
// const createError = require("http-errors");
const { NotFound, BadRequest } = require("http-errors");

const contactsOperations = require("../../models/contacts");
const validationSchemas = require("../../validationSchemas");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   status: "error",
    //   code: 500,
    //   message: "Server error",
    // });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.getContactById(id);
    if (!result) {
      // --- using http-errors obj ---
      throw new NotFound(`Not found`);

      // --- using http-errors ---
      // throw createError(404, `Not found`);

      // --- without http-errors ---
      // const error = new Error(`Not found`);
      // error.status = 404;
      // throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   status: "error",
    //   code: 500,
    //   message: "Server error",
    // });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = validationSchemas.addContact.validate(req.body);
    if (error) {
      throw new BadRequest("Missing required name field");
    }

    const result = await contactsOperations.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      throw new NotFound(`Not found`);
    }
    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = validationSchemas.updateContact.validate(req.body);
    if (error) {
      throw new BadRequest("Missing required name field");
    }

    const { id } = req.params;
    const result = await contactsOperations.updateContact(id, req.body);
    if (!result) {
      throw new NotFound(`Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
