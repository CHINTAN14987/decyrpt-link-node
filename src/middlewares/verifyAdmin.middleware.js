import { Admin } from "../models/admin.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyAdmin = asyncHandler(async (req, res, next) => {
    const id = req?._id;
    const reqToken = req?.token
    const existedUser = await Admin.findById(id).lean().exec();
    if (existedUser?.accessToken !== reqToken) {
        return next(new ApiError(403, "No user available"));
    }
    delete req.token;
    next();
});

