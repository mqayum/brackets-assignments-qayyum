const User = require("../models/user.model")
const bcrypt = require("bcrypt");
const JWT =  require("jsonwebtoken");
const {JWT_SECRET} = require("../../config/credentials");

const signup = async (req, res) => {
    try {
        const bodyData = req.body;

        const userExist = await User.checkUserExistence({
            email: bodyData.email,
            username: bodyData.username
        })
        if (userExist){
            return res.status(409).json({
                message: "User already exist with same email or username"
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        bodyData.password = hashedPassword;

        const user = await User.addUser(bodyData);
        res.status(200).json({
            message: "SUCCESS: User Registered Successfully",
            data: user
        })
    }
    catch (e) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        })
    }

}
const login = async (req, res) => {
    try {
        const bodyData = req.body;
        const userExist = await User.checkUserExistence({
            email: bodyData.email,
            username: bodyData.username
        })
        if (!userExist){
            return res.status(400).json({
                message: "User Account Not Found, Please Register First."
            })
        }
        const passMatched = await bcrypt.compare(bodyData.password, userExist.password)
        if (!passMatched){
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }
        const tokenPayload = {
            _id: userExist._id,
            username: userExist.username,
            email: userExist.email
        }
        const token = JWT.sign(tokenPayload, JWT_SECRET, {
            expiresIn: "24h"
        })
        res.status(200).json({
           message: "Logged In Successfully",
           token
        });
    }
    catch (e) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        })
    }

}
const updateUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const newData = req.body;
        const userFound = await User.checkUserExistence({id:userId});
        if (!userFound){
            return res.status(400).json({
                message: "User Not Found"
            })
        }
        if (req.fileName){
            newData.profileImage = "uploads/"+req.fileName;
        }
        const updateUser = await User.updateUser(userId, newData);
        res.status(200).json({
            message: "SUCCESS: User Updated Successfully",
            data: updateUser
        })
    }
    catch (e) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        })
    }
}

module.exports = {signup, login, updateUser}