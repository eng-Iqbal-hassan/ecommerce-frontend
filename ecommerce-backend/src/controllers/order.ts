import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/feature.js";
import ErrorHandler from "../utils/utilityClass.js";

export const newOrder = TryCatch(async(req: Request<{},{},NewOrderRequestBody>,res,next)=>{
    const {
        shippingInfo, 
        orderItems,
        user,
        subTotal,
        tax,
        shippingCharges,
        discount,
        total
    } = req.body;

    if(
        !shippingInfo ||
        !orderItems ||
        !user ||
        !subTotal ||
        !tax ||
        !shippingCharges ||
        !discount ||
        !total
    ) return next(new ErrorHandler("Please enter all fields",400))

    await Order.create({
        shippingInfo, 
        orderItems,
        user,
        subTotal,
        tax,
        shippingCharges,
        discount,
        total
    })
    
    // After creating the order we need to reduce the stock;
    reduceStock(orderItems);
    // After this we will invalidate the productCache
    await invalidateCache({product: true, order: true, admin: true})
    return res.status(201).json({
        success: true,
        message: "order is placed successfully"
    })
});