const express = require('express');
const router = express.Router();

const PatientController = require('../controllers/patient.controller');
const AppointmentController = require('../controllers/appointment.controller');

const VerifyToken = require("../middlewares/verifyToken.middle");
const { authorizeTo } = require('../middlewares/authorization.middle');
const { SYSTEM_ROLES_ENUM } = require('../../config/constants');


router.post('/add-patient', VerifyToken, authorizeTo([SYSTEM_ROLES_ENUM.ASSISTANT]),
    PatientController.addPatient
);

router.patch('/update-patient/:patientId',VerifyToken,
    authorizeTo([SYSTEM_ROLES_ENUM.ASSISTANT]),
    PatientController.updatePatient
);
router.post('/schedule-appointment', VerifyToken, authorizeTo([SYSTEM_ROLES_ENUM.ASSISTANT]),
    AppointmentController.scheduleAppointment
);

router.patch('/update-appointment/:appointmentId',VerifyToken,
    authorizeTo([SYSTEM_ROLES_ENUM.ASSISTANT]),
    AppointmentController.updateAppointment
);

module.exports = router
