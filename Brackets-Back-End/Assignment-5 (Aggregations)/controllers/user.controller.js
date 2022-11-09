const User = require("../models/user.model");
const userGenerator = require("../user_generator");

const addUser = (req, res) => {
    User.create(req.body);
    res.send("User Added");
}
const generateUserRecords = (req, res) => {
    let qty = req.params.qty;
    let users = userGenerator.generateUsers(qty);
    users.forEach((user)=>{
        try {
            User.create(user)
        } catch (err) {
            return res.status(500).json({
                message: "Error while generating users",
                error: err
            });
        }
    });
    return res.status(201).json({
        message: qty+" User(s) Generated in Database",
        data: users
    });
    
}
const getActiveUsers = async (req, res) => {
    try {
        let activeUsers = await User.getActives();
        return res.status(200).json({
            message: "Success",
            data: activeUsers
        });
        
    } catch (err) {
        return res.status(500).json({
            message: "Error while getting users",
            error: err
        });
    }
}
module.exports = {addUser, generateUserRecords, getActiveUsers};