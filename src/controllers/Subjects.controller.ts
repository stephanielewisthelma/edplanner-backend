import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";
import { CreateSubjectDTO, UpdateSubjectDTO } from "../dtos/subject.dto";

/**
 * Create a subject
 */
export const createSubject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { title, color }: CreateSubjectDTO = req.body;
    if (!title) return res.status(400).json({ message: "title required" });

    const subject = await prisma.subject.create({
      data: {
        title,
        color: color ?? null,
        userId,
      },
    });

    res.status(201).json(subject);
  } catch (err) {
    console.error("createSubject error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * List subjects for authenticated user
 */
export const listSubjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const subjects = await prisma.subject.findMany({
      where: { userId },
      include: {
        classes: true,
        Task: true, // ✅ correct relation name from schema
        Assignment: true,
      },
    });

    res.json(subjects);
  } catch (err) {
    console.error("listSubjects error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update subject
 */
export const updateSubject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const { title, color }: UpdateSubjectDTO = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const result = await prisma.subject.updateMany({
      where: { id, userId },
      data: {
        title: title ?? undefined,
        color: color ?? undefined,
      },
    });

    if (result.count === 0) return res.status(404).json({ message: "Subject not found" });

    res.json({ ok: true });
  } catch (err) {
    console.error("updateSubject error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete subject
 */
export const deleteSubject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const result = await prisma.subject.deleteMany({
      where: { id, userId },
    });

    if (result.count === 0) return res.status(404).json({ message: "Subject not found" });

    res.json({ ok: true });
  } catch (err) {
    console.error("deleteSubject error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
