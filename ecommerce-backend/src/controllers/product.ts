import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody, searchRequestQuery, baseQuery } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utilityClass.js";
import { rm } from "fs";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/feature.js";
// import { faker } from "@faker-js/faker";

// Revalidate on New, Update, Delete Product and on new order(beause when we will place the order, Then the stock of the specific order changes and in a sense there is the updation in product ) --> Also this thing is required because it will update the cache data which is nencessary.
export const getLatestProduct = TryCatch(async(req,res,next)=> {
    let products = [];
    if(myCache.has("latest-product")) {
        products = JSON.parse(myCache.get("latest-product") as string)
    } else {
        products = await Product.find({}).sort({createdAt: -1}).limit(5);
        myCache.set("latest-product", JSON.stringify(products));
    }
    // So here, when a user gets the product from the database, before giving him the products I have also stored them in my cache memory.
    // Next time, we will check from cache memory. If we will have it in our cache memory then we will take the products from there.
    return res.status(200).json({
        success: true,
        products
    })
})

// Revalidate on New, Update, Delete Product and on new order
export const getAllCategories = TryCatch(async(req,res,next)=> {
    let categories;
    if(myCache.has("categories")) {
       categories = JSON.parse(myCache.get("categories") as string) 
    } else {
        categories = await Product.distinct("category");
        myCache.set("categories", JSON.stringify(categories))
    }
    return res.status(200).json({
        success: true,
        categories
    })
})

// Revalidate on New, Update, Delete Product and on new order
export const getAdminProduct = TryCatch(async(req,res,next)=> {
    let products;
    if(myCache.has("all-products")) {
        products = JSON.parse(myCache.get("all-products") as string)
    } else {
        products = await Product.find({});
        myCache.set("all-products", JSON.stringify(products))
    }
    return res.status(200).json({
        success: true,
        products
    })
})

// Revalidate on New, Update, Delete Product and on new order
export const getSingleProduct = TryCatch(async(req,res,next)=> {
    let product;
    const id = req.params.id;
    if (myCache.has(`product-${id}`)) {
        product = JSON.parse(myCache.get(`product-${id}`) as string);
    } else {
        product = await Product.findById(id);
        if(!product) {return next(new ErrorHandler("Product not Found", 404))};
        myCache.set(`product-${id}`,JSON.stringify(product))
    }    
    return res.status(200).json({
        success: true,
        product
    })
})

// We will invalidate our product over there.
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

    await invalidateCache({product: true})

    return res.status(201).json({
        success: true,
        message: "Product is created successfully"
    })
})

export const updateProduct = TryCatch(async(req ,res,next) => {
    const {id} = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    const product = await Product.findById(id);
    if(!product) {return next(new ErrorHandler("Product not Found", 404))};

    if(photo) {
        rm(product.photo, () => {console.log("old photo is deleted")});
        product.photo = photo.path;
    }

    if(name) product.name = name;
    if(price) product.price = price;
    if(stock) product.stock = stock;
    if(category) product.category = category;
    await product.save();
    await invalidateCache({product: true})
    return res.status(200).json({
        success: true,
        message: "Product is updated successfully"
    })
})

export const deleteProduct = TryCatch(async(req,res,next)=> {
    const product = await Product.findById(req.params.id);
    if(!product) {return next(new ErrorHandler("Product not Found", 404))};
    rm(product.photo, () => {console.log("old photo is deleted")});
    await Product.deleteOne({_id:product._id});
    await invalidateCache({product: true})
    return res.status(200).json({
        success: true,
        message: "Product is deleted successfully"
    })
});

export const getAllProducts = TryCatch(async(req: Request<{},{},{},searchRequestQuery>,res,next)=> {
    const {search, sort, price, category} = req.query;
    const page = Number(req.query.page) || 1;
    // 1,2,3,4,5,6,7,8
    //9,10,11,12,13,14,15,16
    //17,18,19,20,21,22,23,24
    const limit = Number(process.env.PRODUCT_PER_PAGE || 8);
    const skip = limit * (page -1);
    const baseQuery : baseQuery = {};
    if (search) {
        baseQuery.name = {
            $regex: search,
            options: "i"
        }
    }
    if (price) baseQuery.price = {$lte: Number(price)};
    if (category) baseQuery.category = category;
    // const [products,filteredOnlyProducts] = await Promise.all(
    //     Product.find(baseQuery)
    //     .sort(sort ? {price: sort==="asc" ? 1 : -1} : undefined)
    //     .limit(limit)
    //     .skip(skip),
    //     Product.find(baseQuery))
    const products = await Product.find(baseQuery)
        .sort(sort ? {price: sort==="asc" ? 1 : -1} : undefined)
        .limit(limit)
        .skip(skip);
    const filteredOnlyProducts = await Product.find(baseQuery);     
    const totalPage = Math.ceil(filteredOnlyProducts.length / limit);    
    return res.status(200).json({
        success: true,
        products,
        totalPage
    })
});

// This function is created to create random products that we will display in frontend
// const generateRandomProducts = async(count: number = 10) => {
//    const products = [];
//    for (let i=0; i< count ; i++) {
//     const product = {
//         name: faker.commerce.productName(),
//         photo: "uploads/e25100d1-c447-4e09-916a-ed4a7c408d88.png",
//         price: Number(faker.commerce.price({ min: 1500, max: 80000, dec: 0 })),
//         stock: Number(faker.commerce.price({ min: 0, max: 100, dec: 0 })),
//         category: faker.commerce.department(),
//         createdAt: new Date(faker.date.past()),
//         updatedAt:  new Date(faker.date.recent()),
//         _v: 0,
//     }
//     products.push(product);
//    } 
//    await Product.create(products);
//    console.log({success: true});
// }
// generateRandomProducts(40);

//By running generateRandomProducts function, I have get products in database(mongoDb), which is being seen.

// const deleteRandomProducts = async(count: number = 10) => {
//     const products = await Product.find({}).skip(2);
//     for (let i=0; i< products.length; i++) {
//         const product = products[i];
//         await Product.deleteOne({_id: product.id});
//     }
//     console.log({success: true})
// }
// When we will run this deleteRandomProducts function, it will skip first two products and delete the rest of products. 

// deleteRandomProducts(38);

