const User = require("../models/user.model")
const bcrypt = require("bcrypt");
const JWT =  require("jsonwebtoken");
const {v4:uuidV4} = require("uuid");
const fs = require("fs");


const { JWT_SECRET,
        TWILIO_SID,
        TWILIO_AUTH,
        TWILIO_MSG_SID  } = require('../../config/credentials');
const client = require("twilio")(TWILIO_SID, TWILIO_AUTH);

const { randomBytes: randomBytesCallback } = require('crypto');
const { promisify } = require('util');
const {SYSTEM_ROLES_ENUM} = require("../../config/constants");
const randomBytes = promisify(randomBytesCallback);

const signup = async (req, res) => {
    try {
        const bodyData = req.body;

        const userExist = await User.checkUserExistence({
            email: bodyData.email,
            username: bodyData.username,
            phone: bodyData.phone
        })
        if (userExist){
            return res.status(409).json({
                message: "User already exist with same email/username or phone"
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        bodyData.password = hashedPassword;

        bodyData.roles = [SYSTEM_ROLES_ENUM.CUSTOMER];
        const user = await User.addUser(bodyData);
        res.status(200).json({
            message: "SUCCESS: User Created Successfully"
        })
    }
    catch (e) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR" + e
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

        if(userExist.twoFactorAuth){
            const buff = await randomBytes(3) // 3 Byte = 24 bits

            const otp = buff.toString('hex') //each Hexadecimal char takes 4 bits which means 24bits = 6 characters
    
            console.log("Generated UserId is : "+otp)
    
            console.log("Sending SMS UserId at: "+userExist.phone)
    
            const sentSMS = await client.messages.create({
                body: otp,
                messagingServiceSid: TWILIO_MSG_SID,
                to: userExist.phone
              })
          
            const updatesUser = await User.updateUser(userExist._id, {otp});

            res.status(200).json({
                message: 'Please enter the UserId',
                userId: userExist._id
              })
        }
        else{
            const uniqueKey = uuidV4();

            const tokenPayload = {
                _id: userExist._id,
                uniqueKey
            }
            const token = JWT.sign(tokenPayload, JWT_SECRET, {
                expiresIn: "24h"
            })

            const updatedUser = await User.updateUser(userExist._id, {$addToSet: {uniqueKeys: uniqueKey}})

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
        const otp = req.body.otp
        const userId  = req.params.userId

        const userVerified = await User.verifyOTP(userId, otp)
        
        if (!userVerified) {
            return res.status(401).json({
                message: 'UserId Verification failed!'
            })
        }

        const uniqueKey = uuidV4();

        const tokenPayload = {
            _id: userVerified._id,
            uniqueKey
        }

        const token = JWT.sign(tokenPayload, JWT_SECRET, {
            expiresIn: "24h"
        })

        await User.updateUser(userVerified._id, {$addToSet: {uniqueKeys: uniqueKey}})
        const updatedUser = await User.updateUser(userVerified._id, {otp: ''})

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
const getCurrentUser = (req, res) => {
    const currentUser = req.user;

    const user = {
        id: currentUser._id,
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        username: currentUser.username,
        email: currentUser.email,
        phone: currentUser.phone,
        profileImage: currentUser.profileImage,
        roles: currentUser.roles,
        twoFactorAuth: currentUser.twoFactorAuth,
    }

    return res.status(200).json({
        message: "SUCCESS: Getting Logged In User Information",
        user,
    })
}
const toggle2FA = async (req, res) => {
    try{
        const user = req.user;
        if (user.twoFactorAuth) {
            await User.updateUser(user._id, {twoFactorAuth: false});
            res.status(200).json({
                message: "2-Factor-Authentication Disabled"
            })
        }
        else{
            await User.updateUser(user._id, {twoFactorAuth: true});
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

        if (req.file){
            const existingPic = userFound.profileImage;

            if (existingPic){
                fs.unlink(`uploads/${existingPic}`, (err) => {
                    if (err)
                        throw err;
                })
            }
            newData.profileImage = req.file.filename;
        }

        const isMatched = await User.shouldUpdate(userId, newData);

        if (isMatched){
            return res.status(409).json({
                message: "User already exist with same email/username or phone."
            })
        }

        const updateUser = await User.updateUser(userId, newData);
        res.status(200).json({
            message: "SUCCESS: User Updated Successfully",
        })
    }
    catch (e) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR" + e
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

module.exports = {signup, login, updateUser, logout, verifyOTP, toggle2FA, getCurrentUser}