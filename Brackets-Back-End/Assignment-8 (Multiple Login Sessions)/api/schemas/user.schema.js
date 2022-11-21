const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName: {type: String, trim: true, required: true},
    lastName: {type: String, trim: true, required: true},
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    age: {type: Number},
    profileImage: {type: String},
    uniqueKeys: {type: [String]}

},{
    timestamp: true,
    strict: true
})

module.exports = mongoose.model("user", userSchema);