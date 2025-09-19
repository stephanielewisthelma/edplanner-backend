import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";
import { CreateTaskDTO } from "../dtos/task.dto";

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { title, description, dueDate, priority, subjectId }: CreateTaskDTO = req.body;
    if (!title) return res.status(400).json({ message: "title required" });

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        priority,
        userId,
        subjectId,
      },
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const tasks = await prisma.task.findMany({ where: { userId }, orderBy: { dueDate: "asc" } });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    const data = req.body;
    const result = await prisma.task.updateMany({ where: { id, userId }, data });
    if (result.count === 0) return res.status(404).json({ message: "Task not found" });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    await prisma.task.deleteMany({ where: { id, userId } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
