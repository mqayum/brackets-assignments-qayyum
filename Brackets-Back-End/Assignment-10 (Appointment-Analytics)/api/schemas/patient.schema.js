const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({
    patientName: {type: String, trim: true, required: true},
    dob: {type: String, trim: true, required: true},
    cnic: {type:String, trim: true, required: true}
},{
    timestamp: true,
    strict: true
})

module.exports = mongoose.model("patient", patientSchema);