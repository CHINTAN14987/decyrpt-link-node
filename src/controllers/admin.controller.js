import { Admin } from "../models/admin.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { adminRegisterUser } from "../utils/joiSchema.js";
import { generateToken } from "../utils/jwt.js";


export const loginAdmin = asyncHandler(async (req, res, next) => {
    const { email, password } = req?.body;
    const validateResult = adminRegisterUser.validate({ email, password });
    if (validateResult?.error) {
      throw new ApiError(400, validateResult?.error?.details[0]?.message, [
        validateResult?.error,
      ]);
    }
  
    const userExisted = await Admin.findOne({ email });
    if (!userExisted) {
      throw new ApiError(400, "Email not registered");
    }
  
    const isPasswordCorrect = await userExisted.isPassWordCorrect(password);
    if (!isPasswordCorrect) {
      throw new ApiError(400, "Incorrect Password");
    }
  
    const data = {
      _id: userExisted?._id,
    };
  
    const accessToken = await generateToken(
      data,
      process.env.ACCESS_SECRET,
      "1d"
    );
    const updateAccessToken = await Admin.findByIdAndUpdate(
      userExisted?._id,
      { $set: { accessToken } },
      { new: true }
    );
  
    const responseData = {
      accessToken: updateAccessToken?.accessToken,
      email: userExisted?.email,
    };
  
    return res
      .status(200)
      .json(new ApiResponse(200, responseData, "Successfully Logged In"));
  });
export const createAdmin = asyncHandler(async (req, res, next) => {
    const { email, password } = req?.body;

    const validateResult = await adminRegisterUser.validate({ email, password });
    if (validateResult?.error) {
        const err = new ApiError(400, validateResult?.error?.details[0]?.message, [validateResult?.error]);
        return next(err);
    }

    const createdAdminUser = await Admin.create({
        email,
        password
    });

    return res.status(200).json(new ApiResponse(200, createdAdminUser, "Admin Created Successfully"));
})
