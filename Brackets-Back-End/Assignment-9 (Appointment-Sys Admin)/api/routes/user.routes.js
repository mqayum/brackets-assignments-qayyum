const express =  require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const VerifyToken = require("../middlewares/verifyToken.middle");
const VerifyUpload = require("../middlewares/multer.middle");

router.post("/login", UserController.login);
router.post("/verify-OTP/:userId", UserController.verifyOTP)
router.get("/toggle-2fa", VerifyToken, UserController.toggle2FA)
router.patch("/:userId", VerifyToken, UserController.updateUser);
router.patch("/:userId/upload", VerifyToken, VerifyUpload, UserController.updateUser);
router.get("/logout", VerifyToken, UserController.logout)

module.exports = router;