const express = require("express");
const authRouter = require("../routes/users.js");
const menuRouter = require("../routes/menu.js");
const orderRouter = require("../routes/order.js");

require("dotenv").config();

module.exports = (app) => {
    app.use((req, res, next) =>{
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
        );

        if(req.method === "OPTIONS"){
            res.header("Access-Control-Allow-Methods", "PUT, GET, PATCH, DELETE");
            return res.status(StatusCode.OK).json({});
        }

        next();
    });

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    const version = process.env.VERSION;

    app.use(`${version}/authenticate`, authRouter);
    app.use(`${version}/menu`, menuRouter);
    app.use(`${version}/order`, orderRouter);

    app.get("/", (req, res, next) => {
        res.json({
            status: true,
            message: "EATRY-PROJECT-V1 IS DOING FINE ✅"
         });
    });
}