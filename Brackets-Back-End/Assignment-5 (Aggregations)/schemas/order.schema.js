const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    orderStatus: {type: String},
    orderNumber: {type: String},
    amountPaid: {type: Number},
    _customerId: {ref: "user", type: mongoose.Schema.Types.ObjectId},
    _productId: {ref: "product", type: mongoose.Schema.Types.ObjectId}
})

module.exports = mongoose.model("Order", orderSchema);