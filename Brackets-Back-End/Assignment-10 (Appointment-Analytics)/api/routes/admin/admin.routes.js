const express =  require("express");
const router = express.Router();
const UserController = require("../../controllers/user.controller");
const VerifyToken = require("../../middlewares/verifyToken.middle");
const {authorizeTo} = require("../../middlewares/authorization.middle");
const {SYSTEM_ROLES_ENUM} = require("../../../config/constants");
const AdminAnalyticsRouter = require("./analystics/admin_analytics.routes");

router.use("/analytics",AdminAnalyticsRouter);

router.post("/create-user", VerifyToken, authorizeTo(SYSTEM_ROLES_ENUM.SYS_ADMIN), UserController.signup);

module.exports = router;