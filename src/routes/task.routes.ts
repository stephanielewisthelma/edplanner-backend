// src/routes/tasks.routes.ts
import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createTask, listTasks, updateTask, deleteTask } from "../controllers/Task.controllers";

const router = Router();
router.use(authenticate);

router.post("/", createTask);
router.get("/", listTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
