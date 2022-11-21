const JWT = require("jsonwebtoken");
const {JWT_SECRET} = require("../../config/credentials");

module.exports = (req, res, next) => {
    const {userId} = req.params;
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            message: "You are not authorized for this action."
        });
    }
    const tokenString = token.split(" ")[1];
    try{
        const decodedPayload = JWT.verify(tokenString,JWT_SECRET);
        if (decodedPayload._id !== userId){
            return res.status(400).json({
                message: "You are not authorized for this action."
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