import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createSubject, listSubjects, deleteSubject } from "../controllers/Subjects.controller";

const router = Router();
router.use(authenticate);

router.post("/", createSubject);
router.get("/", listSubjects);
router.delete("/:id", deleteSubject);

export default router;
