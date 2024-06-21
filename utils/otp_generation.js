const otpGenerator = require("otp-generator");

exports.generateOTP = async() => {
    const OTP = otpGenerator.generate(7, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    return OTP
}