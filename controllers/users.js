const User = require("../models/user");
const otpModel = require("../models/otp.js");
const { userSuccessSignUpMail, loginOtp} = require("../utils/emails/SignUp.js");
const StatusCodes = require("../utils/StatusCode");
const {hashPassword, decrypt} = require("../utils/hash.js");
const { generateOTP } = require("../utils/otp_generation.js");

const register = async (req, res, next) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "This email already exists"
        });
    }
        
    const hashedPass = await hashPassword(password);
    
    const userData = await User.create({
        name: name,
        email: email,
        password: hashedPass
    });

    await userSuccessSignUpMail(email, name);
     
    return res.status(StatusCodes.CREATED).json({
        status: true,
        msg: "Account succcessfully created",
        data: userData
    });
};

const createOTP = async (req, res) => {
    const {email} = req.body;

    const OTP = await generateOTP();

    await otpModel.create({
        email: email,
        code: OTP,
        type: "Login",
        created_at: new Date(),
        otpExpiresAt: Date.now() +  5 * 60 * 1000, //5 mins 
    });

    await loginOtp(email, OTP);

    return res.status(StatusCodes.CREATED).json({
        status: true,
        msg: "Please check your mail for an OTP",
    });
}

const resendOTP = async (req, res) => {
    const { email } = req.body;

    const otpExist = await otpModel.findOne({email});

    //check whether otp already exist for user in db
    if(otpExist){
        // return res.status(StatusCodes.OK).json({
        //     status: true,
        //     msg: "A mail has already been sent to you",
        // });
        
        //delete data from db if exist
        await otpModel.deleteMany({email:otpExist?.email});
    }

    const OTP = await generateOTP();

    //send otp to db
    await otpModel.create({
        email: email,
        code: OTP,
        type: "Login",
        created_at: new Date(),
        otpExpiresAt: Date.now() + 5 * 60 * 1000, //5mins
    });

    //send mail
    await loginOtp(email, OTP);

    return res.status(StatusCodes.CREATED).json({
        status: true,
        msg: "Please check your mail for an OTP",
    });
}

const login = async (req, res) => {
    const {email, password} = req.body;

    const userExist = await User.findOne({ email: email});

    if(!userExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "User account not found please signup",
        });
    }

    const passwordMatch = decrypt(password, userExist.password);

    if(!passwordMatch){
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Incorrect password",
        });
    }

    return res.status(StatusCodes.CREATED).json({
        status: true,
        msg: "Please enter OTP sent to your mail to have access.",
        data: {
            user: userExist,         
        }
    });
    
}

const verifyOTP = async (req, res) => {
    const {email, code } = req.body;

    const otpExist = await otpModel.findOne({code});

    if(!otpExist){
        res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "OTP already used or wrong"
        });
    }

   if(otpExist.email !== email){
        res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Credentials"
        })
    }

    // delete otp from database
    await otpModel.deleteOne({code});

    return res.status(StatusCodes.OK).json({
        status: true,
        msg: "Welcome to Eatry Project",
    });
}

module.exports = {
    register,
    login,
    createOTP,
    resendOTP,
    verifyOTP
}