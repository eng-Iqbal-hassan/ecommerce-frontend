import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.js";

const app = express.Router();

// route: /api/v1/user/new
app.post("/new", newUser);

// route: /api/v1/user/all
app.get("/all", getAllUsers)

// route: /api/v1/user/dynamicId
// app.get("/:id", getUser);
// app.delete("/:id",deleteUser);
// AS both routes are same so we can chain them by the syntax
app.route("/:id").get(getUser).delete(deleteUser)

export default app;