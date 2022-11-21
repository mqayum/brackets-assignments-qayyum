const express =  require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const VerifyToken = require("../middlewares/verifyToken.middle")
const VerifyUpload = require("../middlewares/multer.middle");

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.patch("/:userId", VerifyToken, UserController.updateUser);
router.patch("/:userId/upload", VerifyToken, VerifyUpload, UserController.updateUser);

module.exports = router;