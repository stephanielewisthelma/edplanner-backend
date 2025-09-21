// src/controllers/Task.controllers.ts
import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos/task.dto";

/**
 * Create a task for the authenticated user
 */
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
        // Guarantee a valid enum value (Prisma expects a Priority, not undefined)
        priority: (priority ?? "MEDIUM") as any,
        userId,
        subjectId: subjectId ?? null,
      },
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("createTask error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * List tasks for the authenticated user
 */
export const listTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { dueDate: "asc" },
      include: { subject: true },
    });

    res.json(tasks);
  } catch (err) {
    console.error("listTasks error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update a task (only owner can update)
 */
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const data: UpdateTaskDTO = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!id) return res.status(400).json({ message: "Task ID required" });

    // Build update object only with provided keys (avoid passing undefined)
    const updateData: any = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description ?? null;
    if (data.dueDate !== undefined) updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.subjectId !== undefined) updateData.subjectId = data.subjectId ?? null;

    // nothing to update?
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const result = await prisma.task.updateMany({
      where: { id, userId },
      data: updateData,
    });

    if (result.count === 0) return res.status(404).json({ message: "Task not found or not owned by user" });

    res.json({ ok: true });
  } catch (err) {
    console.error("updateTask error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete a task (only owner can delete)
 */
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!id) return res.status(400).json({ message: "Task ID required" });

    const result = await prisma.task.deleteMany({
      where: { id, userId },
    });

    if (result.count === 0) return res.status(404).json({ message: "Task not found or not owned by user" });

    res.json({ ok: true });
  } catch (err) {
    console.error("deleteTask error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Optional: get single task by id (owner only)
 */
export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!id) return res.status(400).json({ message: "Task ID required" });

    const task = await prisma.task.findFirst({
      where: { id, userId },
      include: { subject: true },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    console.error("getTaskById error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
