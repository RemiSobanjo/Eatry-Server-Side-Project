const mongoose = require('mongoose');

require("dotenv").config();

const db = process.env.DB_URI;

module.exports = (app) => {
    mongoose.set('strictQuery', false);

    mongoose
        .connect(db)
        .then(() => console.log("Eatry project is connected successfully......"));

}