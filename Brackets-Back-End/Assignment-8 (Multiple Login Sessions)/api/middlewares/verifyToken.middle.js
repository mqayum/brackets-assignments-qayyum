const User = require("../models/user.model");
const JWT = require("jsonwebtoken");
const {JWT_SECRET} = require("../../config/credentials");

module.exports = async (req, res, next) => {
    const {userId} = req.params;
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            message: "You are not authorized for this action."
        });
    }
    const tokenString = token.split(" ")[1];

    const foundUser = await User.checkUserExistence({
        email: req.body.email,
        username: req.body.username,
        id: userId
    })
    if (!foundUser){
        return res.status(400).json({
            message: "User Account Not Found, Please Register First."
        })
    }
    
    req.user = foundUser;
    
    try{
        const decodedPayload = JWT.verify(tokenString,JWT_SECRET);
        if (decodedPayload._id !== foundUser._id.toString()){
            return res.status(400).json({
                message: "You are not authorized for this action."
            })
        }

        if(!foundUser.uniqueKeys?.includes(decodedPayload.uniqueKey)){
            return res.status(400).json({
                message: "Session has Ended."
            })
        }
        
    }
    catch(err){
        if(err instanceof JWT.TokenExpiredError){
            return res.status(401).json({
                message: "Session has expired."
            })
        }
    }
    next();
}