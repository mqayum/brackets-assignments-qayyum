const mongoose = require("mongoose");
const {SYSTEM_ROLES_ENUM} = require("../../config/constants");

const userSchema = new mongoose.Schema({
    firstname: {type: String, trim: true, required: true},
    lastname: {type: String, trim: true, required: true},
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    phone: {type: String, unique: true},
    password: {type: String, required: true},
    age: {type: Number},
    profileImage: {type: String},
    uniqueKeys: {type: [String]},
    twoFactorAuth: {type: Boolean},
    otp: {type: String},
    roles: {type: [String], enum: SYSTEM_ROLES_ENUM, required: true}

},{
    timestamp: true,
    strict: true
})

module.exports = mongoose.model("user", userSchema);