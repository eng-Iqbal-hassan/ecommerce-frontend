
import express from "express";

// importing routes

import userRotute from "./routes/user.js";
import productRoute from "./routes/product.js";
import connectDB from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";



const port = 3000;

connectDB();

export const myCache = new NodeCache(); 
// The purpose of caching is that we will store the specific data in the memory and that data will be super fast
// Here let say there is a controller function with the name of getLatestProduct,
// Here, I have get the products from the database and after that what if i will store them in the cache.


const app = express();
app.use(express.json());

app.use("/api/v1/user", userRotute);
app.use("/api/v1/product", productRoute);
app.use("/uploads",express.static("uploads"))
// Due to it by hitting on the url http://localhost:3000/uploads/doc15.png, we get the image which is uploaded in one of the product.

// I have added this middleware at the end so whenever all the middlewraes are executed, then this middleware will be used.
app.use(errorMiddleware);

app.listen(port, ()=> {
    console.log(`Server is working on http://localhost:${port}`)
})