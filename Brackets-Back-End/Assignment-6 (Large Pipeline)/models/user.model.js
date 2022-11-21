const { default: mongoose } = require("mongoose");
const User = require("../schemas/user.schema");

const create = async (data) => {
    try{
        let user = new User(data);
        return await user.save();
    }
    catch(err){
        return err;
    }
    
}
const getAll = async() => {
    
    try{
        let users = await User.find({});
        return users;
    }
    catch(err){
        return err;
    }
     
}
const getActives = async () => {
    try{
        const activeUsersPipeline = [
            {
              '$match': {
                'status': 'Active'
              }
            }
          ];

        return await User.aggregate(activeUsersPipeline);
    }
    catch(err){
        return err;
    }
}
const getNewCustomers = async () => {
    try{
        let users = await User.find({});
        let newCustomers = users.filter((user)=>{
            return user.userType === "Customer" && user.orderId === null;
        });
        return newCustomers;
    }
    catch(err){
        return err;
    }
}
const setOrderId = async (userId, oId) => {
    try {
        return await User.findByIdAndUpdate(userId, {orderId: oId})
    } catch (error) {
        return err;
    }
}
module.exports = {create, getAll, getActives, getNewCustomers, setOrderId};