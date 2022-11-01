const express = require('express');
const router = express.Router();
const {getAllStudents,addStudent,getStudentByID,updateStudent,deleteStudent} = require("../controllers/student.controllers");


router.get("/all",(req, res)=>{
    res.send(getAllStudents());
})
router.get("/:id", (req, res)=>{
    res.send(
        getStudentByID(req.params.id)==null ? "Student Not Found" : getStudentByID(req.params.id)
        );
})
router.post("/add", (req, res)=>{
    addStudent(req.body)
})
router.put("/edit/:id", (req,res)=>{
    res.send(updateStudent(req.params.id, req.body));
})
router.delete("/delete/:id", (req,res)=>{
    res.send(deleteStudent(req.params.id));
})

module.exports = router;