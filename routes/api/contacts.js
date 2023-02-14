const express = require("express");

const { contactsCtrls: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const {
  addContact,
  updateContact,
  favoriteContact,
} = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", auth, ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(addContact), ctrlWrapper(ctrl.add));

router.delete("/:id", auth, ctrlWrapper(ctrl.removeById));

router.put(
  "/:id",
  auth,
  validation(updateContact),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  auth,
  validation(favoriteContact),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
