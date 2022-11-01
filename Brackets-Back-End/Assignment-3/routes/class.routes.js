const express = require('express');
const router = express.Router();

const {getAllClasss,addClass,getClassByID,updateClass,deleteClass} = require("../controllers/class.controller");


router.get("/all",(req, res)=>{
    res.send(getAllClasss());
})
router.get("/:id", (req, res)=>{
    res.send(
        getClassByID(req.params.id)==null ? "Class Not Found" : getClassByID(req.params.id)
        );
})
router.post("/add", (req, res)=>{
    addClass(req.body)
    res.send("Class added successfully");
})
router.put("/edit/:id", (req,res)=>{
    res.send(updateClass(req.params.id, req.body));
})
router.delete("/delete/:id", (req,res)=>{
    res.send(deleteClass(req.params.id));
})

module.exports = router;