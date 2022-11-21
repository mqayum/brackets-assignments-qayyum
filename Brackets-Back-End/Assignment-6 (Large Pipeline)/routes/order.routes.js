const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");

router.post("/generate/:qty", orderController.generateOrderRecords);
router.post("/add", orderController.addOrder);
router.get("/all",orderController.getAllOrders);


module.exports =  router;