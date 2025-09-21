import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  createSubject,
  listSubjects,
  updateSubject,
  deleteSubject,
} from "../controllers/Subjects.controller";

const router = Router();

// POST /api/subjects
router.post("/", authenticate, createSubject);

// GET /api/subjects
router.get("/", authenticate, listSubjects);

// PUT /api/subjects/:id
router.put("/:id", authenticate, updateSubject);

// DELETE /api/subjects/:id
router.delete("/:id", authenticate, deleteSubject);

export default router;
