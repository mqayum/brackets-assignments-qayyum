module.exports  = {
    dbURI: `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.1pce9mf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    dbURILocal: `mongodb://localhost:27017/${process.env.DB_NAME}`,
    JWT_SECRET: process.env.JWT_SECRET,
    TWILIO_MSG_SID: process.env.TWILIO_MSG_SID,
    TWILIO_AUTH: process.env.TWILIO_AUTH,
    TWILIO_SID: process.env.TWILIO_SID
}