const express =  require("express");
const router = express.Router();
const AdminController = require("../../controllers/admin.controller");
const VerifyToken = require("../../middlewares/verifyToken.middle");
const {authorizeTo} = require("../../middlewares/authorization.middle");
const {SYSTEM_ROLES_ENUM} = require("../../../config/constants");

router.post("/get-user/:id", VerifyToken, authorizeTo(SYSTEM_ROLES_ENUM.SYS_ADMIN), AdminController.getUserById);

module.exports = router;