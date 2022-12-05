const express = require('express');
const router = express.Router();

const AppointmentController = require('../controllers/appointment.controller');

const VerifyToken = require("../middlewares/verifyToken.middle");
const { authorizeTo } = require('../middlewares/authorization.middle');
const { SYSTEM_ROLES_ENUM } = require('../../config/constants');


router.patch('/update-appointment/:appointmentId',VerifyToken,
    authorizeTo([SYSTEM_ROLES_ENUM.MD]),
    AppointmentController.updateAppointment
);
router.get('/end-appointment/:appointmentId',VerifyToken,
    authorizeTo([SYSTEM_ROLES_ENUM.MD]),
    AppointmentController.endAppointment
);

module.exports = router
