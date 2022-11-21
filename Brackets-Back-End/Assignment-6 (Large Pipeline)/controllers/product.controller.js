const Product = require("../models/product.model");
const productGenerator = require("../product_generator");

const addProduct = (req, res) => {
    Product.create(req.body);
    res.send("Product Added");
}
const generateProductRecords = async (req, res) => {
    let qty = req.params.qty;
    let products = await productGenerator.generateProducts(qty);
    products.forEach((product)=>{
        try {
            Product.create(product)
        } catch (err) {
            return res.status(500).json({
                message: "Error while generating products",
                error: err
            });
        }
    });
    return res.status(201).json({
        message: qty+" Product(s) Generated in Database",
        data: products
    });
}

module.exports = {addProduct, generateProductRecords};