const menuSchema = require("../models/menu.js");

const createMenu = async (req, res) => {
    const { name, desc, price, created_by } = req.body

    //chekc if item already exists
    const itemExists = await menuSchema.findOne({name});

    //if exists send invalid feedback
    if(itemExists){
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "This menu item already exists"
        });
    }

    //add item to db
    const itemData = await menuSchema.create({
        item: name,
        description: desc,
        price: price,
        created_by: created_by
    });

    return res.status(StatusCodes.CREATED).json({
        status: true,
        msg: "Menu item succcessfully created",
        data: itemData
    });
}

const getMenuItem = async (req, res) => {
    //get item name from body
    const { item } = req.body

    //check db if item exists
    const itemExists = await menuSchema.findOne({item});

    //if not exists send feedback
    if(!itemExists){
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid menu item"
        });
    }

    return res.status(StatusCodes.OK).json({
        status: true,
        msg: "Menu item found",
        data: itemExists
    });
}

module.exports = { createMenu, getMenuItem}