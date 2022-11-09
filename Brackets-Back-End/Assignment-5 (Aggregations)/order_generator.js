const UserModel = require("./models/user.model");
const ProductModel = require("./models/product.model");

const MAX_ORDER_NUM = 9999999999;

const getCustomers = async () => {
    try{
        let users = await UserModel.getAll();
        let customers = users.filter((user)=>{
            return user.userType === "Customer";
        });
        return customers;
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

const generateOrders = async (qty) => {
    let customers = await getCustomers();
    let products = await getProducts();

    let orders = [];
    for(let i=0; i<qty; i++){
        let product = products[randomInt(0,products.length)];
        let order = {
            orderStatus: randomInt(1,100) % 2 == 0 ? "Pending" : "Completed",
            orderNumber: "ORD-"+randomInt(0,MAX_ORDER_NUM),
            amoundPaid: product.productPrice,
            _customerId: customers.length==0 ? null : customers[randomInt(0,customers.length)]._id,
            _productId: products.length==0 ? null : product._id
        }
        orders.push(order);
    }
    return orders;
}

module.exports = {generateOrders};