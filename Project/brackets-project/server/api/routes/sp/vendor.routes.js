const express =  require("express");
const router = express.Router();
const ServiceProviderController = require("../../controllers/service_provider.controller");
const ProductController = require("../../controllers/product.controller")
const upload = require("../../middlewares/multer.middle");
const VerifyToken = require("../../middlewares/verifyToken.middle");
const {authorizeTo} = require("../../middlewares/authorization.middle");
const {SYSTEM_ROLES_ENUM} = require("../../../config/constants");

router.post("/register",VerifyToken, ServiceProviderController.registerVendor);

router.get("/profile",
    VerifyToken,
    authorizeTo(SYSTEM_ROLES_ENUM.VENDOR),
    ServiceProviderController.getVendorByUserId);

router.patch("/update/:spId",
    VerifyToken,
    authorizeTo(SYSTEM_ROLES_ENUM.VENDOR),
    ServiceProviderController.updateVendor);

router.post("/update/:spId/logo",
    VerifyToken,
    authorizeTo(SYSTEM_ROLES_ENUM.VENDOR),
    upload.single("brandLogo"),
    ServiceProviderController.updateVendor);

router.post("/product",
    VerifyToken,
    authorizeTo(SYSTEM_ROLES_ENUM.VENDOR),
    upload.array("productImages", 4),
    ProductController.addProduct);

router.get("/product/listed",
    VerifyToken,
    authorizeTo(SYSTEM_ROLES_ENUM.VENDOR),
    ProductController.getListedProducts);

router.get("/product/:productId",
    VerifyToken,
    authorizeTo(SYSTEM_ROLES_ENUM.VENDOR),
    ProductController.getProductById);

router.patch("/product/:productId/edit",
    VerifyToken,
    authorizeTo(SYSTEM_ROLES_ENUM.VENDOR),
    upload.array("productImages", 4),
    ProductController.updateProduct);

router.delete("/product/:productId",
    VerifyToken,
    authorizeTo(SYSTEM_ROLES_ENUM.VENDOR),
    ProductController.deleteProduct);

module.exports = router;