const express = require("express");

const { usersCtrls: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const {
  joiRegisterSchema,
  joiLoginSchema,
  subscription,
  verifyEmailSchema,
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

router.post(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

// router.post(
//   "/avatars",
//   auth,
//   upload.single("avatar"),
//   (req, res) => {
//     try {
//       if (req.file) {
//         console.log(req.file);
//         res.json(req.file);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

router.post(
  "/verify",
  validation(verifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

module.exports = router;
