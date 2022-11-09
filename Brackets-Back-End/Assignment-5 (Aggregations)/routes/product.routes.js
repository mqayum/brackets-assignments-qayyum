const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.post("/add", productController.addProduct);
router.post("/generate/:qty", productController.generateProductRecords);


module.exports =  router;