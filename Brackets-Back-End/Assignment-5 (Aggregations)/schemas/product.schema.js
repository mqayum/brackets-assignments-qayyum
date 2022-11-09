const mongoose = require("mongoose");

const productSchema = mongoose.Schema({

    productName: {type: String},
    productPrice: {type: Number},
    productQuantity: {type: Number},
    productNumber: {type: String},
    productUploadBy: {
        ref: "user",
        type: mongoose.Schema.Types.ObjectId
    },
});

module.exports = mongoose.model("Product", productSchema);