const express = require("express");
const ctrl = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { addContact, updateContact, favoriteContact } = require("../../models");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(addContact), ctrlWrapper(ctrl.add));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

router.put("/:id", validation(updateContact), ctrlWrapper(ctrl.updateById));

router.patch(
  "/:id/favorite",
  validation(favoriteContact),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
