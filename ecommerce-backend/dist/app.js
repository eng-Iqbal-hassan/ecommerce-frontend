import express from "express";
// importing routes
import userRotute from "./routes/user.js";
import productRoute from "./routes/product.js";
import connectDB from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/error.js";
const port = 3000;
connectDB();
const app = express();
app.use(express.json());
app.use("/api/v1/user", userRotute);
app.use("/api/v1/product", productRoute);
// I have added this middleware at the end so whenever all the middlewraes are executed, then this middleware will be used.
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});
