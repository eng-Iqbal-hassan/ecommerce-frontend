import { User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utilityClass.js";
export const newUser = TryCatch(async (req, res, next) => {
    const { _id, name, email, photo, gender, dob } = req.body;
    let user = await User.findById(_id);
    if (user) {
        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.name}`
        });
    }
    if (!_id || !name || !email || !photo || !gender || !dob) {
        return next(new ErrorHandler("Please Enter All fields", 400));
    }
    user = await User.create({ _id, name, email, photo, gender, dob: new Date(dob) });
    return res.status(200).json({
        success: true,
        message: `Welcome, ${user.name}`
    });
});
export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({});
    return res.status(200).json({
        success: true,
        users
    });
});
export const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        next(new ErrorHandler("Invalid user id", 400));
    }
    return res.status(200).json({
        success: true,
        user
    });
});
export const deleteUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        next(new ErrorHandler("Invalid user id", 400));
    }
    await user?.deleteOne();
    return res.status(200).json({
        success: true,
        message: "User is deleted successfully",
    });
});
