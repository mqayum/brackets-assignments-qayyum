const express = require("express");
const http = require("http");
const {dBConnect} = require("./config/dbConn");
const userRouter = require("./api/routes/user.routes")

const PORT = 9999;
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use("/user",userRouter);

dBConnect();

const server = http.createServer(app);
server.listen(PORT, ()=>{
    console.log("Server is listening at port "+PORT)
});