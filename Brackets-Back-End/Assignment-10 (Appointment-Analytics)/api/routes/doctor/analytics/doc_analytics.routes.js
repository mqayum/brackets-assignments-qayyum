const express = require("express");
const { SYSTEM_ROLES_ENUM } = require("../../../../config/constants");
const router = express.Router();
const AnalyticsController = require("../../../controllers/analytics.controller");
const { authorizeTo } = require("../../../middlewares/authorization.middle");
const verifyTokenMiddle = require("../../../middlewares/verifyToken.middle");

router.get("/time-per-day", verifyTokenMiddle, authorizeTo(SYSTEM_ROLES_ENUM.MD) ,AnalyticsController.getTimeSpentPerDay);
router.get("/time-by-mode",verifyTokenMiddle, authorizeTo(SYSTEM_ROLES_ENUM.MD), AnalyticsController.getTimeSpentByTimeMode);

module.exports = router;