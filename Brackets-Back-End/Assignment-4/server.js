const express = require("express");
const mongoose  = require("mongoose");
let connectStr = `mongodb+srv://mqayyum:Qayyum123@cluster0.zwrnkf5.mongodb.net/?retryWrites=true&w=majority&dbName=practice`

mongoose.connect(connectStr,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((res)=>{
    console.log("Connection with MongoDB Sucessful" );
}).catch((err)=>{
    console.log("Connection with MongoDB failed: "+err);
})

const PORT_NO = 9999;
const app = express();
app.use(express.json());

const studentRouter = require("./routes/student.routes");
const teacherRouter = require("./routes/teacher.routes");
const classRouter = require("./routes/class.routes");

app.use('/student', studentRouter);
app.use('/teacher',teacherRouter);
app.use('/class',classRouter);

app.get("/",(req, res)=>{
    res.send("Welcome to my page");
})

app.listen(PORT_NO,()=>{
    console.log("server is listening at port "+PORT_NO);
});