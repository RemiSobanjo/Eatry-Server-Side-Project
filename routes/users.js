const express = require("express");
const router = express.Router();
// const {authValidation, otpValidation} = require("../validations/userValidation.js")

const usersController = require("../controllers/users.js");

router.post("/register", usersController.register);
//router.post("/login", authValidation, usersController.signIn);



module.exports = router;