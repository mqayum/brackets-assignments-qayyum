const Patient = require("../models/patient.model")
const bcrypt = require("bcrypt");


const addPatient = async (req, res) => {
    try {
        const bodyData = req.body;

        const patientExist = await Patient.checkPatientExistence({
            cnic: bodyData.cnic
        })
        if (patientExist){
            return res.status(409).json({
                message: "Patient already exist with same CNIC"
            })
        }

        const patient = await Patient.addPatient(bodyData);
        res.status(200).json({
            message: "SUCCESS: Patient Added Successfully",
            data: patient
        })
    }
    catch (e) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        })
    }

}
const updatePatient = async (req, res) => {
    try {
        const {patientId} = req.params;
        const newData = req.body;
        const patientFound = await Patient.checkPatientExistence({id:patientId});
        if (!patientFound){
            return res.status(400).json({
                message: "Patient Not Found"
            })
        }
        const updatePatient = await Patient.updatePatient(patientId, newData);
        res.status(200).json({
            message: "SUCCESS: Patient Info Updated Successfully",
            data: updatePatient
        })
    }
    catch (e) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        })
    }
}


module.exports = {addPatient, updatePatient}