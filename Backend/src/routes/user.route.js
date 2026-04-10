const UserController = require("../controller/user.controller");
const router = require("express").Router();
const upload = require("../utils/Owner.images");
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
router.post("/sendotp", UserController.SendOtp);
router.post("/verifyotp", UserController.verifyOtp);
//reset password
router.post("/reset", UserController.ResetPassword);
///update profile
router.patch(
  "/:id",
  upload.single("profileImage"),
  UserController.UpdateProfile
);
router.get("/:id", UserController.FindByIdProfile);
module.exports = router;
