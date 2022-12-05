const User = require("../schemas/user.schema")

const addUser = async (data) => {
    try {
        const user = new User(data)
        return user.save();
    }
    catch (e) {
        return e;
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
        return e;
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
        return e;
    }
}



module.exports = {addUser, checkUserExistence, updateUser}