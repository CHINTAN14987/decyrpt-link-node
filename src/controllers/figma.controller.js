import asyncHandler from "../utils/asyncHandler.js";
import { Figma } from "../models/figma.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { encrypt } from "../utils/crypto.js";
export const AllFigmaDetails = asyncHandler(async (req, res, next) => {
  const allFigmaDetails = await Figma.find();
  return res
    .status(200)
    .json(new ApiResponse(200, allFigmaDetails, "all figma data"));
});
export const createFigmaDetails = asyncHandler(async (req, res, next) => {
    const { link, userEmail, password } = req.body;
    const encryptedLink = encrypt(link);
  
    const filter = { userEmail };
    const update = { password, userEmail, link: encryptedLink };
    const options = { new: true, upsert: true };
  
    const updatedOrCreatedFigma = await Figma.findOneAndUpdate(filter, update, options);
  
    return res
      .status(200)
      .json(new ApiResponse(200, updatedOrCreatedFigma, "Figma detail created or updated"));
  });
export const upDateFigmaDetails = asyncHandler(async (req, res, next) => {
  const { id, userEmail, password, link } = req.body;
  const encryptedText = encrypt(link);
  const updateFigma = await Figma.findByIdAndUpdate(
    id,
    { $set: { userEmail, password, link: encryptedText } },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updateFigma, "figma detail updated"));
});

export const deleteFigmaDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const deletedFigma = await Figma.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, deletedFigma, "figma detail deleted"));
});
export const viewUserFigma = asyncHandler(async (req, res, next) => {
    const { userEmail, password } = req.body;
   const findFigma=await Figma.findOne({userEmail, password})
    return res
      .status(200)
      .json(new ApiResponse(200, findFigma.link, "figma"));
  });
  