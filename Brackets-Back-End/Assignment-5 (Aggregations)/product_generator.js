const UserModel = require("./models/user.model");

const productNames = ["Gaming Headset","VR Box","Nike Shoes","Mouse Pad","RGB Keyboard","USB Stick","Canon Camera","Laptop Bag","Table Lamp","Gold Chain","Gaming PC","Intel Processor","iPad Pro","Chiller AC","Smart LED","Fancy Pouch"];

const getAdminUsers = async () => {
    try{
        let users = await UserModel.getAll();
        let adminUsers = users.filter((user)=>{
            return user.userType === "Admin";
        });
        return adminUsers;
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

const generateProducts = async (qty) => {
    let adminUsers = await getAdminUsers();
    
    let products = [];
    for(let i=0; i<qty; i++){
        
        let product = {
            productName: productNames[randomInt(0, productNames.length)],
            productPrice: randomInt(10,1000),
            productQuantity: randomInt(1,10),
            productNumber: "PR-"+randomInt(1000,9999),
            productUploadBy: adminUsers.length==0 ? null : adminUsers[randomInt(0,adminUsers.length)]._id
        }
        products.push(product);
    }
    return products;
}

module.exports = {generateProducts};