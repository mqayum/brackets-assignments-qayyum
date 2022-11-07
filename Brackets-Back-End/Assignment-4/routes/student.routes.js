const express = require('express');
const router = express.Router();

const studentController = require("../controllers/student.controller");

router.post("/new", studentController.newStudent)
router.get("/all", studentController.getAllStudents)
router.put("/edit/:id", studentController.updateStudentByID);
router.delete("/delete/:id", studentController.deleteStudentByID);
router.delete("/deleteManyBy/:type/:value", studentController.deleteStudents);
router.put("/updateManyBy/:type/:value", studentController.updateStudents);



// router.get("/:id", (req, res)=>{
//     res.send(
//         getStudentByID(req.params.id)==null ? "Student Not Found" : getStudentByID(req.params.id)
//         );
// })
// router.post("/add", (req, res)=>{
//     addStudent(req.body)
//     res.send("Student added successfully");
// })



module.exports = router;