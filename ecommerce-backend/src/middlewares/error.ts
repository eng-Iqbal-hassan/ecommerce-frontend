import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utilityClass.js";
import { controllerType } from "../types/types.js";
export const errorMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction)=>{
    
    err.message ||= "Internal server error"; 
    err.statusCode ||= 500;
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}


// try-catch wrapper 
// export const TryCatch = () => () => {};
// Whenever we will call this TryCatch function, we will get the second function. 
export const TryCatch = 
    (func: controllerType) =>
    (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(func(req,res,next)).catch(next);
    // Here when the next will be used it will call the last middleware in app.ts which is errorMiddleware which is again playing with errorHandler.
    // we will use tryCatch function in our controller and it will take a funcion in it
    // It means that whenever we need to return the error we will write next error and send the error in that
    };

// Here the outer function return the inner function it is one liner so no need to write outer return.    