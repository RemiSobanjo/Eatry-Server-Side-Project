const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    item_id: {type: String, required: true},
    item: {type: String, required: true},
    order_by: {type: String, required: true},
    price: { type: String, required: true},
    quantity: { type: String, required: true},
    status: {type: Number, required: true, default: 0},
    created_by: { type: String, required: true},
    created_at: { type: Date },
});

module.exports = mongoose.model("order", orderSchema);