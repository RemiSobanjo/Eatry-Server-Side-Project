const nodemailer = require("nodemailer");
require("dotenv").config();

exports.userSuccessSignUpMail = async (email, name) => {
    try{
        var smtpConfig = {
            service: process.env.SERVICE,
            host: process.env.HOST,
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.MAILER,
                pass: process.env.PASSMAILER,
            },
            tls : { rejectUnauthorized: false }
        };

        const transporter = nodemailer.createTransport(smtpConfig);

        await transporter.sendMail({
            from: process.env.MAILER,
            to: email,
            subject: "Successful Signup",
            html: `<b> Hello, ${name}</b></br>
            <p>
                Thank you for Signing Up with us. We're happy to serve you.
                <br /> 
                
                Best Regards
            </p>`
        });
        console.log("email sent successfully");
    }
    catch(error){
        console.log(error, "email not sent");
    }
};

exports.loginOtp = async (email, otp) => {
    try{
        var smtpConfig = {
            service: process.env.SERVICE,
            host: process.env.HOST,
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.MAILER,
                pass: process.env.PASSMAILER,
            },
            tls : { rejectUnauthorized: false }
        };

        const transporter = nodemailer.createTransport(smtpConfig);

        await transporter.sendMail({
            from: process.env.MAILER,
            to: email,
            subject: "Login OTP",
            html: `<b> Hello </b></br>
            <p>
                To login, please enter the OTP when prompted. Thank you
                <br /> 
                One-Time Passcode: ${otp}
                <br />
                Best Regards
            </p>`
        });
        console.log("email sent successfully");
    }
    catch(error){
        console.log(error, "email not sent");
    }
};
