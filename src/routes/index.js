import { Router } from "express";
import admin from "./admin/admin.routes.js";

const router = Router();

router.use("/admin", admin);
export default router;