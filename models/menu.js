const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
    item: {type: String, required: true},
    description: {type: String, required: true},
    price: { type: String, required: true},
    created_by: { type: String, required: true},
    created_at: { type: Date },
});

module.exports = mongoose.model("menu", menuSchema);