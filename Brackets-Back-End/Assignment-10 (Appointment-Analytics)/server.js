require('dotenv').config()

const express = require("express");
const http = require("http");
const {dBConnect} = require("./config/dbConn");

const UserRouter = require("./api/routes/user.routes");
const TwilioRouter = require('./api/routes/twilio.routes');
const AdminRouter = require("./api/routes/admin/admin.routes");
const AssistantRouter = require("./api/routes/assistant.routes");
const MDRouter = require("./api/routes/doctor/doctor.routes");

const PORT = 9999;
const app = express();
app.use(express.json());

app.use("/user",UserRouter);
app.use("/verify",TwilioRouter);
app.use("/admin",AdminRouter);
app.use("/assistant",AssistantRouter);
app.use("/doctor",MDRouter)

dBConnect();

app.get("/", (req, res)=>{
    return res.status(200).json({
        message: "Welcome Aboard."
    })
})

const server = http.createServer(app);
server.listen(PORT, ()=>{
    console.log("Server is listening at port "+PORT)
});