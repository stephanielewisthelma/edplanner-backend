import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createClass, listClasses, deleteClass } from "../controllers/Classes.controllers";

const router = Router();
router.use(authenticate);

router.post("/", createClass);
router.get("/", listClasses);
router.delete("/:id", deleteClass);

export default router;
