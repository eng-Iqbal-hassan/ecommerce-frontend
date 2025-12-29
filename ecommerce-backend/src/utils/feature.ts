import mongoose from "mongoose";
import { InvalidateCacheProps, OrderItemType } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";

const connectDB = async (uri:string) => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database is connected")
    );

    await mongoose.connect(uri, {
      dbName: "ecommerce-store",
    });
  } catch (err) {
    console.error("DB connection failed:", err);
  }
};

export default connectDB;


export const invalidateCache = async({product, order, admin} : InvalidateCacheProps) => {
  if (product) {
    const productKeys : string[] = [
      "latest-product",
      "categories",
      "all-products"
    ];
    // product-${id}
    const products = await Product.find({}).select("_id");
    products.forEach((i)=>{
      productKeys.push(`product-${i._id}`)
    })
    myCache.del(productKeys)
  }
  if (order) {
    
  }
  if (admin) {
    
  }
} 

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for(let i=0; i< orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if(!product) throw new Error("Product Not Found");
    product.stock -= order.quantity;
    await product.save();
  }
}

