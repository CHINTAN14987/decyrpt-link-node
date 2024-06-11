import { Router } from "express";
import { createAdmin, loginAdmin } from "../../controllers/admin.controller.js";
import { AllFigmaDetails, createFigmaDetails, deleteFigmaDetails, upDateFigmaDetails, viewUserFigma } from "../../controllers/figma.controller.js";

const router = Router();

router.route("/login").post(loginAdmin);
router.route("/register").post(createAdmin);
router.route("/get-all-figma").get(AllFigmaDetails);
router.route("/create-figma").post(createFigmaDetails);
router.route("/update-figma").put(upDateFigmaDetails);
router.route("/delete-figma").delete(deleteFigmaDetails);
router.route("/view-user-figma").post(viewUserFigma);
export default router;