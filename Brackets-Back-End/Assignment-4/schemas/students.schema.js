const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
    {
    "name": String,
    "age": Number,
    "rollID": {type: Number, unique: true},
    "email": {type: String, unique: true}
    }
)

module.exports = mongoose.model("Student",studentSchema);