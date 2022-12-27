const express =  require("express");
const router = express.Router();

const DesignerRouter = require("./designer.routes");
const VendorRouter = require("./vendor.routes");

router.use("/designer",DesignerRouter);
router.use("/vendor",VendorRouter);

module.exports = router;