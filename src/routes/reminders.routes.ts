import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createReminder, listReminders, deleteReminder } from "../controllers/reminders.controllers";

const router = Router();
router.use(authenticate);

router.post("/", createReminder);
router.get("/", listReminders);
router.delete("/:id", deleteReminder);

export default router;
