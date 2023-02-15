const express = require("express");

const { usersCtrls: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const {
  joiRegisterSchema,
  joiLoginSchema,
  subscription,
} = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiRegisterSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch(
  "/:id/subscription",
  validation(subscription),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
