const express = require("express");

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

app.listen(9999,()=>{
    console.log("server is listening");
});