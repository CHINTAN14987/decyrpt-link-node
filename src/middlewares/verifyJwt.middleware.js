import jwt from 'jsonwebtoken';
import ApiError from "../utils/ApiError.js";

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        throw new ApiError(401, "unAuthorized");
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_SECRET,
        async (error, decoded) => {
            if (error) {
                return next(new ApiError(403, "Forbidden"));
            }
            req._id = decoded._id;
            req.token = token;
            next();
        })
}