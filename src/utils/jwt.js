import jwt from 'jsonwebtoken';
import ApiError from './ApiError.js';

export const generateToken = async (data, secret, expireTime) => {
    try {
        const token =  jwt.sign(
            data,
            secret,
            {
                expiresIn: expireTime
            }
        );
        return token
    } catch (error) {
        throw new ApiError(500, "Error while generating token", error);
    }
}

export const decodeToken = async (token, secret) => {
    try {
        const decToken = await jwt.verify(
            token,
            secret
        );
        return decToken
    } catch (error) {
        throw new ApiError(500, "Error while decoding token", error);
    }
}