const express = require("express");
const router = express.Router();
const {authValidation, otpValidation} = require("../validation/userValidation.js")

const usersController = require("../controllers/users.js");

router.post("/register", authValidation, usersController.register);
router.post("/login", authValidation, usersController.login);

router.post("/otp/sendOTP", otpValidation, usersController.createOTP);
router.post("/otp/resendOTP", otpValidation, usersController.resendOTP);
router.put("/otp/verifyOTP",otpValidation, usersController.verifyOTP);


module.exports = router;