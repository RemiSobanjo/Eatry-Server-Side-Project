const User = require("../models/user");
const { userSuccessSignUpMail, signUpOtp} = require("../utils/emails/SignUp.js");
const StatusCodes = require("../utils/StatusCode");
const passSecured = require("../utils/hash.js")

const register = async (req, res, next) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "This email already exists"
        });
    }
        
    const hashedPass = await passSecured(password);
    
    const userData = await User.create({
        name: name,
        email: email,
        password: hashedPass
    });

    //await userSuccessSignUpMail(email, name);
     
    return res.status(StatusCodes.CREATED).json({
        status: true,
        msg: "Account succcessfully created",
        data: userData
    });
};

module.exports = {
    register
}