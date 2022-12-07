const Patient = require("../schemas/patient.schema")

const addPatient = async (data) => {
    try {
        const patient = new Patient(data)
        return patient.save();
    }
    catch (e) {
        throw e;
    }
}
const checkPatientExistence = async (keys) => {
    try {
        const patient = await Patient.findOne({
            $or: [
                {cnic: {$eq: keys.cnic}},
                {_id: {$eq: keys.id}}
            ]
        })
        return patient;
    }
    catch (e) {
        throw e;
    }
}
const updatePatient = async (id, data) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(id, data, {
            new: true
        });
        return updatedPatient;
    }
    catch (e) {
        throw e;
    }
}



module.exports = {addPatient, checkPatientExistence, updatePatient}