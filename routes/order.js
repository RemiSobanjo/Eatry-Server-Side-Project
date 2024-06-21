const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.js");

router.post("/createOrder", orderController.createOrder);
router.put("/updateOrder", orderController.updateOrder);


module.exports = router;