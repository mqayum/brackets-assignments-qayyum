const User = require("../schemas/user.schema")

const addUser = async (data) => {
    try {
        const user = new User(data)
        return user.save();
    }
    catch (e) {
        throw e;
    }
}
const checkUserExistence = async (keys) => {
    try {
        const user = await User.findOne({
            $or: [
                {email: {$eq: keys.email}},
                {username: {$eq: keys.username}},
                {_id: {$eq: keys.id}}
            ]
        })
        return user;
    }
    catch (e) {
        throw e;
    }
}
const updateUser = async (id, data) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, data, {
            new: true
        });
        return updatedUser;
    }
    catch (e) {
        throw e;
    }
}
const verifyOTP = async (id, otp) => {
    try {
        const verifiedUser = await User.findOne({ _id: id, OTP: otp }).lean().select('-password')
        return verifiedUser;
    }
    catch(e){
        throw e;
    }
}


module.exports = {addUser, checkUserExistence, updateUser, verifyOTP}