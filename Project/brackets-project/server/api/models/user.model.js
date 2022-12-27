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
                {_id: {$eq: keys.id}},
                {phone: {$eq: keys.phone}}
            ]
        })
        return user;
    }
    catch (e) {
        throw e;
    }
}
const assignRole = async (userId, role) => {
    try {
        const user = await checkUserExistence({id: userId})
        if (user){
            const userRoles = user.roles;
            userRoles.includes(role) || userRoles.push(role);
            return User.findByIdAndUpdate(userId, {roles: userRoles});
        }
        return null;
    }
    catch (e) {
        throw e;
    }
}
const shouldUpdate = async (id, data) => {
    try {
        const foundUser = await User.findOne({
            $and: [
                {_id: {$ne: id}},
                {
                    $or: [
                        {email: {$eq: data.email}},
                        {phone: {$eq: data.phone}},
                        {username: {$eq: data.username}},
                    ]
                }
            ]
        });
        return foundUser;
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
        const verifiedUser = await User.findOne({ _id: id, otp: otp }).lean().select('-password')
        return verifiedUser;
    }
    catch(e){
        throw e;
    }
}


module.exports = {addUser, checkUserExistence, updateUser, shouldUpdate, assignRole, verifyOTP}