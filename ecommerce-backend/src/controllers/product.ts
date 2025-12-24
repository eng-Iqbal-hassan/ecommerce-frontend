import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utilityClass.js";
import { rm } from "fs";

export const newProduct = TryCatch(async(req: Request<{},{},NewProductRequestBody>,res,next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if(!photo) {
        return next(new ErrorHandler("Kindly add photo",400))
    }
    if(!name || !price || !stock || !category) {
        if(photo) {rm(photo.path, () => {console.log("photo is deleted")})}
        return next(new ErrorHandler("Kindly add all fields",400))
    }
    await Product.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photo: photo?.path
    });
    return res.status(201).json({
        success: true,
        message: "Product is created successfully"
    })
})

export const getLatestProduct = TryCatch(async(req,res,next)=> {
    // Get latest 5 products
    const products = await Product.find({}).sort({createdAt: -1}).limit(5);
    return res.status(200).json({
        success: true,
        products
    })
})

export const getAllCategories = TryCatch(async(req,res,next)=> {
    
    const categories = await Product.distinct("category");
    return res.status(200).json({
        success: true,
        categories
    })
})

export const getAdminProduct = TryCatch(async(req,res,next)=> {
    const products = await Product.find({});
    return res.status(200).json({
        success: true,
        products
    })
})

export const getSingleProduct = TryCatch(async(req,res,next)=> {
    const product = await Product.findById(req.params.id);
    return res.status(200).json({
        success: true,
        product
    })
})