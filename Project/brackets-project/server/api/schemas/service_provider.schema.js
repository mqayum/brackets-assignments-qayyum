const mongoose = require("mongoose");

const service_providerSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    spName: {type: String, trim: true, required: true},
    role: {type: String, trim: true, required: true},
    spLogo: {type: String, trim: true},
    jobTitle: {type: String, trim: true},
    skills: {type: [String]},
    bio: {type: String, trim: true},
    businessPhone: {type: String, trim: true, unique: true},
    businessAddress: {type: String, trim: true},
    brandLogo: {type: String, trim:true},
},{
    timestamp: true,
    strict: true
})

module.exports = mongoose.model("service_providers", service_providerSchema);