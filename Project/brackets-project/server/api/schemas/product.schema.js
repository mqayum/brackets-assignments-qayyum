const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    vendorId: {type: mongoose.Schema.Types.ObjectId, ref: "ServiceProvider", required: true},
    productTitle: {type: String, trim: true, required: true},
    productDesc: {type: String, trim: true, required: true},
    productPrice: {type: String, trim: true, required: true},
    productRating: {type: String, trim: true},
    productImages: {type: [String]},
    productCategory: {type: String, trim: true},
    productType: {type: String}
},{
    timestamp: true,
    strict: true
})

module.exports = mongoose.model("products", productSchema);