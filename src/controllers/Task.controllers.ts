// src/controllers/tasks.controller.ts
import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos/task.dto";

// create task
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { title, description, dueDate, priority, subjectId }: CreateTaskDTO = req.body;
    if (!title) return res.status(400).json({ message: "title required" });

    const task = await prisma.task.create({
      data: {
        title,
        description: description ?? null,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority: priority ?? undefined,
        userId,
        subjectId: subjectId ?? null,
      },
    });

    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// list tasks for authenticated user
export const listTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { dueDate: "asc" },
    });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// update task
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const data: UpdateTaskDTO = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!id) return res.status(400).json({ message: "Task ID required" });

    // Normalize optional fields
    const updateData: any = {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.description !== undefined ? { description: data.description ?? null } : {}),
      ...(data.dueDate !== undefined ? { dueDate: data.dueDate ? new Date(data.dueDate) : null } : {}),
      ...(data.priority !== undefined ? { priority: data.priority } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
      ...(data.subjectId !== undefined ? { subjectId: data.subjectId ?? null } : {}),
    };

    const result = await prisma.task.updateMany({
      where: { id, userId },
      data: updateData,
    });

    if (result.count === 0) return res.status(404).json({ message: "Task not found" });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// delete task
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!id) return res.status(400).json({ message: "Task ID required" });

    await prisma.task.deleteMany({ where: { id, userId } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
