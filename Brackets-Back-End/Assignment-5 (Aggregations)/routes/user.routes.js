const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.post("/generate/:qty", userController.generateUserRecords);
router.post("/add", userController.addUser);
router.get("/actives", userController.getActiveUsers);

module.exports =  router;