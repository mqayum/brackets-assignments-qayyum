const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "uploads");
    },
    filename: function (req, file, cb){
        const originalExtension = file.originalname.split(".").pop();
        const filename = file.fieldname + "-" + Date.now() + "."+originalExtension;
        req.fileName = filename;
        cb(null, filename);
    }
})

const filterFunc = (req, file, cb) => {
    const originalExtension = file.originalname.split(".").pop();

    if(originalExtension === "png" || originalExtension === "jpg" || originalExtension === "jpeg"){
        cb(null, true)
    }
    else{
        return cb(new Error("Invalid file type"), false)
    }
}
const limitsObj = {
    fileSize: 200*1024, //200KB
}

module.exports = uploadFile = (req, res, next) => {
    const upload = multer({storage: storage, fileFilter: filterFunc, limits: limitsObj}).single("profile");

    upload(req, res, function (err) {
        if (err){
            return res.status(401).json({
                message: "UPLOAD FAILED: "+err.message
            })
        }
        next();
    })
}





