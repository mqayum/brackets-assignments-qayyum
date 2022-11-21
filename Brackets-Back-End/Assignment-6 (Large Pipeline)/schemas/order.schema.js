const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    orderStatus: {type: String},
    orderNumber: {type: String},
    amountPaid: {type: Number},
    _customerId: {ref: "user", type: mongoose.Schema.Types.ObjectId},
    _productIds: {type: Array}
})

module.exports = mongoose.model("Order", orderSchema);