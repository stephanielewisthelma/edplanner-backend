// src/routes/users.routes.ts
import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getProfile, updateProfile } from "../controllers/userController.control";

const router = Router();
router.use(authenticate);

router.get("/me", getProfile);
router.put("/me", updateProfile);

export default router;
