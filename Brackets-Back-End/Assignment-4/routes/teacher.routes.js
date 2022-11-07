const express = require('express');
const router = express.Router();

const teacherController = require("../controllers/teacher.controller");

router.post("/new", teacherController.newTeacher);
router.get("/id/:id", teacherController.getTeacherByID);
router.get("/all", teacherController.getAllTeachers);
router.put("/edit/:id", teacherController.updateTeacherByID);
router.delete("/delete/:id", teacherController.deleteTeacherByID);
router.delete("/deleteManyBy/:type/:value", teacherController.deleteTeachers);
router.put("/updateManyBy/:type/:value", teacherController.updateTeachers);



module.exports = router;