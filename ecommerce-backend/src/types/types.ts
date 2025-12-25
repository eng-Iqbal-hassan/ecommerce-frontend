import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
    _id: string,
    name: string,
    email: string,
    photo: string,
    gender: string,
    role: string,
    dob: Date,
}

export interface NewProductRequestBody {
    name: string,
    price: number,
    stock: number,
    category: string,
}

export type controllerType = (
    req: Request,
     res: Response,
    next: NextFunction) => Promise<void | Response<any, Record<string, any>>>


export type searchRequestQuery = {
    search?: string,
    price?: string,
    category?: string,
    sort?: string,
    page?: string,
}

export interface baseQuery {
    name?: {
        $regex: string,
        options: string,
    },
    price?: {
        $lte: number
    },
    category?: string,
}