const express = require('express');
const router = express.Router();

const studentController = require("../controllers/student.controller");

router.post("/new", studentController.newStudent);
router.get("/id/:id", studentController.getStudentByID);
router.get("/all", studentController.getAllStudents);
router.put("/edit/:id", studentController.updateStudentByID);
router.delete("/delete/:id", studentController.deleteStudentByID);
router.delete("/deleteManyBy/:type/:value", studentController.deleteStudents);
router.put("/updateManyBy/:type/:value", studentController.updateStudents);



module.exports = router;