require('dotenv').config()

const express = require("express");
const http = require("http");
const cors = require("cors");

const {dBConnect} = require("./config/dbConn");

const UserRouter = require("./api/routes/user.routes");
const TwilioRouter = require('./api/routes/twilio.routes');
const AdminRouter = require("./api/routes/admin/admin.routes");
const ServiceProviderRouter = require("./api/routes/sp/sp.routes")
const path = require("path");

const PORT = 9999;
const app = express();


app.use(cors({
    origin: "*",
    method: "*",
    credentials: true
}))

app.use(express.json());
app.use(express.static("uploads"));

app.get("/test", (req, res)=>{
    res.status(200).json({
        message: "Hi from server"
    });
});
app.use("/user",UserRouter);
app.use("/verify",TwilioRouter);
app.use("/admin",AdminRouter);
app.use("/sp",ServiceProviderRouter);


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