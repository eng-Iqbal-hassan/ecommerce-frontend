
import express from "express";

// importing routes

import userRotute from "./routes/user.js";
import connectDB from "./utils/feature.js";



const port = 3000;

connectDB();

const app = express();
app.use(express.json());

app.listen(port, ()=> {
    console.log(`Server is working on http://localhost:${port}`)
})

app.use("/api/v1/user", userRotute);