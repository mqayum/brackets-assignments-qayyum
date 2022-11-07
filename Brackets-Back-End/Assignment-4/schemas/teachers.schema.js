const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
    {
        name: {type: String},
        qualification: {type: String}
    }
)

module.exports = mongoose.model("Teacher",teacherSchema);