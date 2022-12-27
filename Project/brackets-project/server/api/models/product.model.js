const Product = require("../schemas/product.schema")

const addProduct = async (data) => {
    try {
        const product = new Product(data)
        return product.save();
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


module.exports = {addProduct, updateProduct, getAllByVendorId}