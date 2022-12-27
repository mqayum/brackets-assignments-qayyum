const express =  require("express");
const router = express.Router();
const ServiceProviderController = require("../../controllers/service_provider.controller");
const VerifyToken = require("../../middlewares/verifyToken.middle");
const {authorizeTo} = require("../../middlewares/authorization.middle");
const {SYSTEM_ROLES_ENUM} = require("../../../config/constants");
const upload = require("../../middlewares/multer.middle");

router.post("/register",VerifyToken,ServiceProviderController.registerDesigner);

router.get("/profile",
    VerifyToken,
    authorizeTo(SYSTEM_ROLES_ENUM.DESIGNER),
    ServiceProviderController.getDesignerByUserId);

router.patch("/update/:spId",
    VerifyToken,
    authorizeTo(SYSTEM_ROLES_ENUM.DESIGNER),
    ServiceProviderController.updateDesigner);

router.post("/update/:spId/logo",
    VerifyToken,
    authorizeTo(SYSTEM_ROLES_ENUM.DESIGNER),
    upload.single("brandLogo"),
    ServiceProviderController.updateDesigner);


module.exports = router;