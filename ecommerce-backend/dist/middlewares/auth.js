import { User } from "../models/user.js";
import ErrorHandler from "../utils/utilityClass.js";
import { TryCatch } from "./error.js";
// Middleware to make sure only admin is allowed
export const adminOnly = TryCatch(async (req, res, next) => {
    const { id } = req.query;
    // query is an object and we will destruct it and will get the id out of it.
    // Here when the url will be like /api/v1/user/kfuhg?key=24 here key=24 are query parameter, in frontend we will set it. 
    // in our case the url will be like /api/v1/user/all?key=bkhcghbjkhv
    if (!id) {
        return next(new ErrorHandler("Kindly login first", 401));
    }
    ;
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("User not valid", 401));
    }
    ;
    if (user.role !== "admin") {
        return next(new ErrorHandler("user does not have permission", 401));
    }
    next();
});
