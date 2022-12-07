const User = require("../models/user.model")
const bcrypt = require("bcrypt");
const JWT =  require("jsonwebtoken");
const {v4:uuidV4} = require("uuid");

const { JWT_SECRET,
        TWILIO_SID,
        TWILIO_AUTH,
        TWILIO_MSG_SID  } = require('../../config/credentials');
const client = require("twilio")(TWILIO_SID, TWILIO_AUTH);

const { randomBytes: randomBytesCallback } = require('crypto');
const { promisify } = require('util');
const randomBytes = promisify(randomBytesCallback);

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
            message: "SUCCESS: User Created Successfully",
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

        if(userExist.TFA){
            const buff = await randomBytes(3) // 3 Byte = 24 bits

            const OTP = buff.toString('hex') //each Hexadecimal char takes 4 bits which means 24bits = 6 characters
    
            console.log("Generated OTP is : "+OTP)
    
            console.log("Sending SMS OTP at: "+userExist.phone)
    
            const sentSMS = await client.messages.create({
                body: OTP,
                messagingServiceSid: TWILIO_MSG_SID,
                to: userExist.phone
              })
          
            const updatesUser = await User.updateUser(userExist._id, {OTP});

            res.status(200).json({
                message: 'Please enter the OTP',
                userId: userExist._id
              })
        }
        else{
            const uniqueKey = uuidV4();

            const tokenPayload = {
                _id: userExist._id,
                username: userExist.username,
                email: userExist.email,
                uniqueKey
            }
            const token = JWT.sign(tokenPayload, JWT_SECRET, {
                expiresIn: "24h"
            })

            await User.updateUser(userExist._id, {$addToSet: {uniqueKeys: uniqueKey}})

            res.status(200).json({
                message: "Logged In Successfully",
                token
            });
        }

        
    }
    catch (e) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR " + e
        })
    }

}
const verifyOTP = async (req, res) => {
    try{
        const otp = req.body.OTP

        const userId  = req.params.userId

        const user = await User.verifyOTP(userId, otp)
        
        if (!user) {
        return res.status(401).json({
            message: 'OTP Verification failed!'
        })
        }

        const uniqueKey = uuidV4();

        const tokenPayload = {
            _id: user._id,
            username: user.username,
            email: user.email,
            uniqueKey
        }
        const token = JWT.sign(tokenPayload, JWT_SECRET, {
            expiresIn: "24h"
        })

        await User.updateUser(user._id, {$addToSet: {uniqueKeys: uniqueKey}})
        await User.updateUser(user._id, {OTP: ''})

        res.status(200).json({
            message: "Logged In Successfully",
            token
        });
    }
    catch(err){
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR "+err
        })
    }
}
const toggle2FA = async (req, res) => {
    try{
        const user = req.user;
        if (user.TFA) {
            await User.updateUser(user._id, {TFA: false});
            res.status(200).json({
                message: "2-Factor-Authentication Disabled"
            })
        }
        else{
            await User.updateUser(user._id, {TFA: true});
            res.status(200).json({
                message: "2-Factor-Authentication Enabled Successfully"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        });
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
const logout = async (req, res) => {
    if(!req.user){
        return res.status(400).json({
            message: "You are not Logged In."
        })
    }
    try{
        
        await User.updateUser(req.user._id, {uniqueKeys: []})
        return res.status(200).json({
            message: "All Active Sessions Logged Out Successfully"
        })
    }
    catch(err){
        res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        })
    }
    
}

module.exports = {signup, login, updateUser, logout, verifyOTP, toggle2FA}