const express = require('express');
const router = express.Router();

const classController = require("../controllers/class.controller");

router.post("/new", classController.newClass);
router.get("/id/:id", classController.getClassByID);
router.get("/all", classController.getAllClasses);
router.put("/edit/:id", classController.updateClassByID);
router.delete("/delete/:id", classController.deleteClassByID);
router.delete("/deleteManyBy/:type/:value", classController.deleteClasses);
router.put("/updateManyBy/:type/:value", classController.updateClasses);



module.exports = router;