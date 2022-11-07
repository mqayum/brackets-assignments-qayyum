const mongoose = require("mongoose");

const classSchema = mongoose.Schema(
    {
        class_duration : {type: String},
        room : {type: String},
        teacher_id : {type: String},
        student_ids : {type: Array}
    }
)

module.exports = mongoose.model("Class",classSchema);