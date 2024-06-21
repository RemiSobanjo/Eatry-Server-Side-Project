const express = require("express");
const router = express.Router();

const menuController = require("../controllers/menu.js");

router.post("/addMenu", menuController.createMenu);
router.get("/getSingleItem", menuController.getMenuItem);


module.exports = router;