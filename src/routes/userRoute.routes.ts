import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getProfile, updateProfile } from "../controllers/userController.control";

const router = Router();

router.get("/me", authenticate, getProfile);
router.put("/me", authenticate, updateProfile);

export default router;
