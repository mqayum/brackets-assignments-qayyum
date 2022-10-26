const express = require("express");

const app = express();
const {getAllUsers,addUser,getUserByID,updateUser,deleteUser} = require("./controller.js");
app.use(express.json());

app.get("/",(req, res)=>{
    res.send("Welcome to my page");
})
app.get("/users",(req, res)=>{
    res.send(getAllUsers());
})
app.get("/user/:id", (req, res)=>{
    res.send(
        getUserByID(req.params.id)==null ? "User Not Found" : getUser(req.params.id)
        );
})
app.post("/user/add", (req, res)=>{
    addUser(req.body)
})
app.put("/user/edit/:id", (req,res)=>{
    res.send(updateUser(req.params.id, req.body));
})
app.delete("/user/delete/:id", (req,res)=>{
    res.send(deleteUser(req.params.id));
})

app.listen(9999,()=>{
    console.log("server is listening");
});