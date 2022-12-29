const Product = require("../schemas/product.schema")
const mongoose = require("mongoose");


const addProduct = async (data) => {
    try {
        const product = new Product(data)
        return product.save();
    }
    catch (e) {
        throw e;
    }
}
const findProductById = async (productId) => {
    try {
        const pipeline = [
            {
                '$match': {
                    '_id': new mongoose.Types.ObjectId(productId)
                }
            }, {
                '$lookup': {
                    'from': 'service_providers',
                    'localField': 'vendorId',
                    'foreignField': '_id',
                    'as': 'vendor'
                }
            }
        ]
        const product = await Product.aggregate(pipeline);
        return product[0];
    }
    catch (e) {
        throw e;
    }
}
const getAllByVendorId = async (vendorId) => {
    try {
        const pipeline = [
            {
                '$match': {
                    'vendorId': vendorId
                }
            }, {
                '$lookup': {
                    'from': 'service_providers',
                    'localField': 'vendorId',
                    'foreignField': '_id',
                    'as': 'vendor'
                }
            }, {
                '$unwind': {
                    'path': '$vendor',
                    'preserveNullAndEmptyArrays': false
                }
            }
        ];
        return await Product.aggregate(pipeline);
    }
    catch (e) {
        throw e;
    }
}
const updateProduct = async (id, data) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, data, {
            new: true
        });
        return updatedProduct;
    }
    catch (e) {
        throw e;
    }
}

const deleteProduct = async (productId) => {
    try {
        const id = new mongoose.Types.ObjectId(productId)
        return await Product.deleteOne(id)
    }
    catch (e) {
        throw e;
    }
}


module.exports = {addProduct, findProductById, updateProduct, deleteProduct, getAllByVendorId}