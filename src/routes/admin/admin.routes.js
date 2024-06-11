import { Router } from "express";
import { createAdmin, loginAdmin } from "../../controllers/admin.controller.js";
import { AllFigmaDetails, createFigmaDetails, deleteFigmaDetails, upDateFigmaDetails, viewUserFigma } from "../../controllers/figma.controller.js";
import {  verifyAdmin } from "../../middlewares/verifyAdmin.middleware.js";
import { verifyJWT } from "../../middlewares/verifyJwt.middleware.js";

const router = Router();

router.route("/login").post(loginAdmin);
router.route("/register").post(createAdmin);
router.route("/get-all-figma").get(verifyJWT, verifyAdmin, AllFigmaDetails);
router.route("/create-figma").post(verifyJWT, verifyAdmin,createFigmaDetails);
router.route("/update-figma").put(verifyJWT, verifyAdmin, upDateFigmaDetails);
router.route("/delete-figma").delete(verifyJWT, verifyAdmin, deleteFigmaDetails);
router.route("/view-user-figma").post(viewUserFigma);
export default router;