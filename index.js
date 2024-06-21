const express = require("express");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3300;

//add routes and db configuration
require("./operations/routes")(app);
require("./operations/db")(app);

//create port for connection
app.listen(PORT, () => {
    console.log("Eatry app is listening to port " + PORT);
});