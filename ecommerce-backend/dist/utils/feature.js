import mongoose from "mongoose";
const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("Database is connected"));
        await mongoose.connect("mongodb+srv://engiqbal110:iqbal123@cluster0.uhkwsdl.mongodb.net", {
            dbName: "ecommerce-store",
        });
    }
    catch (err) {
        console.error("DB connection failed:", err);
    }
};
export default connectDB;
