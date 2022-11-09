const Order = require("../models/order.model");
const orderGenerator = require("../order_generator");

const addOrder = (req, res) => {
    Order.create(req.body);
    res.send("Order Added");
}
const generateOrderRecords = async (req, res) => {
    let qty = req.params.qty;
    let orders = await orderGenerator.generateOrders(qty);

    orders.forEach((order)=>{
        try {
            Order.create(order)
        } catch (err) {
            return res.status(500).json({
                message: "Error while generating orders",
                error: err
            });
        }
    });
    return res.status(201).json({
        message: qty+" Order(s) Generated in Database",
        data: orders
    });
}
const getAllOrders = async (req, res) => {
    try {
        let orders = await Order.getAll();
        return res.status(200).json({
            message: "Success",
            data: orders
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error while getting orders data",
            error: err
        });
    }
}

module.exports = {addOrder, generateOrderRecords, getAllOrders};