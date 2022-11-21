const UserModel = require("./models/user.model");
const ProductModel = require("./models/product.model");
const mongoose = require("mongoose");

const MAX_ORDER_NUM = 9999999999;

const getCustomers = async () => {
    try{
        return await UserModel.getNewCustomers();
    }
    catch(err){
        return err;
    }
}
const getProducts = async () => {
    try{
        let products = await ProductModel.getAll();
        return products;
    }
    catch(err){
        return err;
    }
}

const randomInt = (min, max) => {
    let diff = max - min;
    let rand =  Math.floor(Math.random() * diff);
    return rand + min;
}
const getRandomOrderedProducts = async (products) => {
    let purchasedCount = randomInt(0,10);
    let purchasedProducts = [];
    for (let p = 0; p < purchasedCount; p++) {
        let product = products[randomInt(0,products.length)]
        purchasedProducts.push(product);
    }
    return purchasedProducts;
}
const associateOrderToCustomer = async (uId, oId) => {
    try {
        await UserModel.setOrderId(uId, oId)
    } catch (error) {
        console.log("Failed to associate order with customer");
    }
}
const getTotalPaidAmount = (purchasedProducts) => {
    let total = 0;
    purchasedProducts.forEach(product => {
        total += product.productPrice;
    });
    return total;
}

const generateOrders = async (qty) => {
    let orders = [];
    let products = await getProducts();
    let customers = await getCustomers();
    
    for(let i=0; i<qty; i++){
    
        let purchasedProducts = await getRandomOrderedProducts(products);
        let productIds = purchasedProducts.map((product)=>{
            return product._id;
        })
        let customer = customers[i];
        
        let order = {
            _id: mongoose.Types.ObjectId(),
            orderStatus: randomInt(1,100) % 2 == 0 ? "Pending" : "Completed",
            orderNumber: "ORD-"+randomInt(0,MAX_ORDER_NUM),
            amoundPaid: getTotalPaidAmount(purchasedProducts),
            _customerId: customers.length==0 ? null : customer._id,
            _productIds: productIds.length==0 ? null : productIds
        }

        await associateOrderToCustomer(customer._id, order._id)
        orders.push(order);
    }
    return orders;
}

module.exports = {generateOrders};