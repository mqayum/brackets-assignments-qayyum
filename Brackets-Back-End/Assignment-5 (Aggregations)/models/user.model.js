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
        return await User.find();
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

module.exports = {create, getAll, getActives};