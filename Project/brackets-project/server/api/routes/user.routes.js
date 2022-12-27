const express =  require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const VerifyToken = require("../middlewares/verifyToken.middle");
const upload = require("../middlewares/multer.middle");
const {authorizeTo} = require("../middlewares/authorization.middle");
const {SYSTEM_ROLES_ENUM} = require("../../config/constants");


router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/verifyOTP/:userId", UserController.verifyOTP);
router.post("/toggle-2fa", VerifyToken, UserController.toggle2FA);
router.get("/me", VerifyToken, UserController.getCurrentUser);
router.patch("/:userId", VerifyToken, UserController.updateUser);
router.post("/:userId/upload", VerifyToken, upload.single("profileImage"), UserController.updateUser);

router.get("/logout", VerifyToken, UserController.logout)

module.exports = router;