const Product = require("../schemas/product.schema");

const create = async (data) => {
    try{
        let product = new Product(data);
        return await product.save();
    }
    catch(err){
        return err;
    }
    
}
const getAll = async() => {
    
    try{
        return await Product.find();
    }
    catch(err){
        return err;
    }

}

module.exports = {create, getAll};