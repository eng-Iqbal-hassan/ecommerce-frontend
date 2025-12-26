import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
const connectDB = async (uri) => {
    try {
        mongoose.connection.on("connected", () => console.log("Database is connected"));
        await mongoose.connect(uri, {
            dbName: "ecommerce-store",
        });
    }
    catch (err) {
        console.error("DB connection failed:", err);
    }
};
export default connectDB;
export const invalidateCache = async ({ product, order, admin }) => {
    if (product) {
        const productKeys = [
            "latest-product",
            "categories",
            "all-products"
        ];
        // product-${id}
        const products = await Product.find({}).select("_id");
        products.forEach((i) => {
            productKeys.push(`product-${i._id}`);
        });
        myCache.del(productKeys);
    }
    if (order) {
    }
    if (admin) {
    }
};
