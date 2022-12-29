const Product = require("../models/product.model")
const fs = require("fs");
const ServiceProvider = require("../models/service_provider.model");
const User = require("../models/user.model");

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
        let products = await Product.getAllByVendorId(vendorId)

        products = products.map((product)=>{
            return {...product, productId:product._id}
        })
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
const getProductById = async (req, res) => {
    try{
        const {productId} = req.params;
        const productFound = await Product.findProductById(productId);
        if (!productFound){
            return res.status(400).json({
                message: "Product Not Found"
            })
        }

        res.status(200).json({
            message: "SUCCESS: Product Info Retrieved Successfully",
            product: productFound,
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

        const productFound = await Product.findProductById(productId);
        if (!productFound){
            return res.status(400).json({
                message: "Product Not Found"
            })
        }

        if (req.files.length > 0){

            const existingPics = productFound.productImages;

            if (existingPics.length > 0){
                existingPics.forEach((pic)=>{
                    fs.unlink(`uploads/${pic}`, (err) => {
                        if (err)
                            throw err;
                    })
                })
            }
            const files = req.files;
            const updatedImages = files.map(file=>file.filename)
            newData.productImages = updatedImages;
        }
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
const deleteProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        const productFound = await Product.findProductById(productId);
        if (!productFound){
            return res.status(400).json({
                message: "Product Not Found"
            })
        }
        const result = await Product.deleteProduct(productId);
        return res.status(200).json({
            message: "SUCCESS: Product Deleted Successfully",
        })
    }
    catch (e) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR" + e
        })
    }
}


module.exports = {addProduct, getProductById, updateProduct, deleteProduct, getListedProducts}