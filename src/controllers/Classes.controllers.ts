import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";
import { CreateClassDTO, UpdateClassDTO } from "../dtos/class.dto";

/**
 * Create class under a subject
 */
export const createClass = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { title, location, startTime, endTime, subjectId }: CreateClassDTO = req.body;
    if (!title || !startTime || !endTime || !subjectId) {
      return res.status(400).json({ message: "title, subjectId, startTime, endTime required" });
    }

    const classItem = await prisma.class.create({
      data: {
        title,
        location: location ?? null,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        subjectId,
        userId,
      },
    });

    res.status(201).json(classItem);
  } catch (err) {
    console.error("createClass error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * List classes for user
 */
export const listClasses = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const classes = await prisma.class.findMany({
      where: { userId },
      include: { subject: true },
      orderBy: { startTime: "asc" },
    });

    res.json(classes);
  } catch (err) {
    console.error("listClasses error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update class
 */
export const updateClass = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const data: UpdateClassDTO = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.location !== undefined) updateData.location = data.location ?? null;
    if (data.startTime !== undefined) updateData.startTime = new Date(data.startTime);
    if (data.endTime !== undefined) updateData.endTime = new Date(data.endTime);
    if (data.subjectId !== undefined) updateData.subjectId = data.subjectId;

    const result = await prisma.class.updateMany({
      where: { id, userId },
      data: updateData,
    });

    if (result.count === 0) return res.status(404).json({ message: "Class not found" });

    res.json({ ok: true });
  } catch (err) {
    console.error("updateClass error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete class
 */
export const deleteClass = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const result = await prisma.class.deleteMany({
      where: { id, userId },
    });

    if (result.count === 0) return res.status(404).json({ message: "Class not found" });

    res.json({ ok: true });
  } catch (err) {
    console.error("deleteClass error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
