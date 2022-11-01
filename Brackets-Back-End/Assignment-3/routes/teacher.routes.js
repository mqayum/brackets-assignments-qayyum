const express = require('express');
const router = express.Router();

const {getAllTeachers,addTeacher,getTeacherByID,updateTeacher,deleteTeacher} = require("../controllers/teacher.controller");


router.get("/all",(req, res)=>{
    res.send(getAllTeachers());
})
router.get("/:id", (req, res)=>{
    res.send(
        getTeacherByID(req.params.id)==null ? "Teacher Not Found" : getTeacherByID(req.params.id)
        );
})
router.post("/add", (req, res)=>{
    addTeacher(req.body)
    res.send("Teacher added successfully");
})
router.put("/edit/:id", (req,res)=>{
    res.send(updateTeacher(req.params.id, req.body));
})
router.delete("/delete/:id", (req,res)=>{
    res.send(deleteTeacher(req.params.id));
})

module.exports = router;