const mongoose = require("mongoose");

const productSchema = mongoose.Schema({

    productName: {type: String},
    productPrice: {type: Number},
    productQuantity: {type: Number},
    productNumber: {type: String},
    productColors: {type: Array},
    productUploadBy: {
        ref: "user",
        type: mongoose.Schema.Types.ObjectId
    },
});

module.exports = mongoose.model("Product", productSchema);