const Joi = require("joi");
const STATUSCODE = require("../utils/StatusCode.js");

exports.authValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        // name: Joi.string().required(),
        // googleToken: Joi.string(),
        // facebookToken: Joi.string()
    });

    const validateOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };

   
    const result = schema.validate(req.body, validateOptions);

    if(result.error){
        return res.status(STATUSCODE.BAD_REQUEST).json({
            error: {
                message: result.message,
            },
        });
    }
    next();
};

exports.otpValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        // googleToken: Joi.string(),
        // facebookToken: Joi.string(),
    });

    const validateOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };

    const result = schema.validate(req.body, validateOptions);

    if(result.error){
        return res.status(STATUSCODE.BAD_REQUEST).json({
            error: {
                message: result.message,
            },
        });
    }

    next();
};
