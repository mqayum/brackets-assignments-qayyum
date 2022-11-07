const express = require("express");
const app = express();
app.use(express.json());
const PORT = 9999;

const mongoose = require("mongoose");


const connectStr = `mongodb+srv://mqayyum:Qayyum123@cluster0.zwrnkf5.mongodb.net/?retryWrites=true&w=majority&dbName=aggregation_practice`;
mongoose.connect(connectStr,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res)=>{
    console.log("DB Connection successful");
}).catch((err)=>{
    console.log("DB Connection failed");
})



app.listen(PORT, ()=>{
    console.log("Server started listening at port "+PORT);
})