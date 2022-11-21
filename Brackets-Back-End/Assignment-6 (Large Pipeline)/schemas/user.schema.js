const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    phoneNumber: {type: String},
    city: {type: String},
    state: {type: String},
    zipCode: {type: String},
    status: {type: String},
    userType: {type: String},
    orderId: {ref: "order", type: mongoose.Schema.Types.ObjectId},
    userDetails: {type: Array}
});

module.exports = mongoose.model("User", userSchema);