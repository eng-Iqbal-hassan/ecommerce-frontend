import express from "express";
import { getAdminProduct, getAllCategories, getLatestProduct, getSingleProduct, newProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", adminOnly, singleUpload, newProduct);
app.get("/latest", getLatestProduct);
app.get("/categories", getAllCategories);
app.get("/admin-products", getAdminProduct);
app.route("/:id").get(getSingleProduct)
export default app;