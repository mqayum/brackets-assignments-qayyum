const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
    {
        name: {type: String},
        age: {type: Number},
        rollID: {type: Number, unique: true},
        email: {type: String, unique: true}
    }
)

module.exports = mongoose.model("Student",studentSchema);