const Product = require("../models/product.model")
const fs = require("fs");
const ServiceProvider = require("../models/service_provider.model");

const addProduct = async (req, res) => {
    try {
        const bodyData = req.body;
        const vendor = req.vendor;

        bodyData.vendorId = vendor.id;

        if (req.files){
            const files = req.files;
            const productImages = files.map(file=>file.filename)
            bodyData.productImages = productImages;
        }
        const product = await Product.addProduct(bodyData);
        res.status(200).json({
            message: "SUCCESS: Product Created Successfully"
        })
    }
    catch (e) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR" + e
        })
    }

}
const getListedProducts = async (req, res) => {
    try{
        const vendor = req.vendor;
        const vendorId = vendor.id;
        const products = await Product.getAllByVendorId(vendorId)

        res.status(200).json({
            message: "SUCCESS: Listed Products Retrieved Successfully",
            products,
        })
    }
    catch (e) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR" + e
        })
    }
}
const updateProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        const newData = req.body;

        const updateProduct = await Product.updateProduct(productId, newData);
        res.status(200).json({
            message: "SUCCESS: Product Updated Successfully",
        })
    }
    catch (e) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR" + e
        })
    }
}


module.exports = {addProduct, updateProduct, getListedProducts}