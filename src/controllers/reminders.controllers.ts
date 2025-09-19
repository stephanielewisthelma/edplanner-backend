import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";
import { CreateReminderDTO } from "../dtos/reminder.dto";

export const createReminder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { title, remindAt, taskId }: CreateReminderDTO = req.body;
    if (!title || !remindAt) return res.status(400).json({ message: "title and remindAt required" });

    const reminder = await prisma.reminder.create({
      data: { title, remindAt: new Date(remindAt), userId, taskId },
    });
    res.status(201).json(reminder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listReminders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const reminders = await prisma.reminder.findMany({ where: { userId }, orderBy: { remindAt: "asc" } });
    res.json(reminders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteReminder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.reminder.deleteMany({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
