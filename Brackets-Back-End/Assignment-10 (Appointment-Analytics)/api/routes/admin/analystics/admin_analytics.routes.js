const express = require("express");
const { SYSTEM_ROLES_ENUM } = require("../../../../config/constants");
const router = express.Router();
const AnalyticsController = require("../../../controllers/analytics.controller");
const { authorizeTo } = require("../../../middlewares/authorization.middle");
const verifyToken = require("../../../middlewares/verifyToken.middle");

router.get("/time-per-day/:doctorId", verifyToken, authorizeTo(SYSTEM_ROLES_ENUM.SYS_ADMIN) ,AnalyticsController.getTimeSpentPerDay);
router.get("/time-by-mode/:doctorId",verifyToken, authorizeTo(SYSTEM_ROLES_ENUM.SYS_ADMIN), AnalyticsController.getTimeSpentByTimeMode);

module.exports = router;