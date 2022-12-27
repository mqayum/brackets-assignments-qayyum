const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "uploads");
    },
    filename: function (req, file, cb){
        const originalExtension = file.originalname.split(".").pop();
        const filename = file.fieldname + "-" + Date.now() + "."+originalExtension;
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
    fileSize: 1024*1024, //1MB
}

const upload = multer({storage: storage, fileFilter: filterFunc, limits: limitsObj})

module.exports = upload;




