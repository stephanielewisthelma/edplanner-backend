import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";
import { CreateClassDTO, UpdateClassDTO } from "../dtos/class.dto";

/**
 * Create class under a subject
 */
export const createClass = async (req: AuthRequest, res: Response) => {
  try {
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
      },
    });

    res.status(201).json(classItem);
  } catch (err) {
    console.error("createClass error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * List classes (optionally filter by subjectId)
 */
export const listClasses = async (req: AuthRequest, res: Response) => {
  try {
    const { subjectId } = req.query;

    const classes = await prisma.class.findMany({
      where: subjectId ? { subjectId: String(subjectId) } : {},
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
    const { id } = req.params;
    const data: UpdateClassDTO = req.body;

    // Validate that id is a non-empty string
    if (!id) {
      return res.status(400).json({ message: "Class ID is required" });
    }

    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.location !== undefined) updateData.location = data.location ?? null;
    if (data.startTime !== undefined) updateData.startTime = new Date(data.startTime);
    if (data.endTime !== undefined) updateData.endTime = new Date(data.endTime);
    if (data.subjectId !== undefined) updateData.subjectId = data.subjectId;

    const updatedClass = await prisma.class.update({
      where: { id },
      data: updateData,
    });

    res.json(updatedClass);
  } catch (err) {
    console.error("updateClass error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteClass = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Class ID is required" });
    }

    await prisma.class.delete({
      where: { id },
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("deleteClass error:", err);
    res.status(500).json({ message: "Server error" });
  }
};