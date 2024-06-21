const orderSchema = require("../models/order.js");
const { generateOTP } = require("../utils/otp_generation.js");

const createOrder = async (req, res) => {
    const { name, order_by, price, quantity, created_by } = req.body

    //calculate total order
    const orderTotal = price * quantity;

    //generate unique menu id
    let id = await generateOTP();
    
    id = "AKD" + id

    //add item to db
    const orderData = await orderSchema.create({
        item_id: id,
        item: name,
        order_by: order_by,
        price: price,
        quantity: quantity,
        created_by: created_by
    });

    return res.status(StatusCodes.CREATED).json({
        status: true,
        msg: "Order added successfully. Your total bill is : " + orderTotal,
        data: orderData
    });
}

const updateOrder = async (req, res) => {
    const {item_id } = req.body;

    //check if item exists in db
    const orderExists =  await orderSchema.findOne({item_id});

    if(!orderExists){
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid order id"
        });
    }
    const update = { $set: { status: 1}};
    const options = { upsert: true };

    await orderSchema.updateOne({ status: 0 }, update, options)

    return res.status(StatusCodes.OK).json({
        status: true,
        msg: "Order updated successfully"
    });
        
}

module.exports = {createOrder, updateOrder}