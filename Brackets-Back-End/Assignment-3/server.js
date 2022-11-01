const express = require("express");

const app = express();
app.use(express.json());

const studentRouter = require("./routes/student.routes");
app.use('/student', studentRouter);

app.get("/",(req, res)=>{
    res.send("Welcome to my page");
})

app.listen(9999,()=>{
    console.log("server is listening");
});