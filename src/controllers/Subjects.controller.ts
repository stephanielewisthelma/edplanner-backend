import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";
import { CreateSubjectDTO } from "../dtos/subject.dto";

export const createSubject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { title, color }: CreateSubjectDTO = req.body;
    if (!title) return res.status(400).json({ message: "title required" });

    const subject = await prisma.subject.create({ data: { title, color, userId } });
    res.status(201).json(subject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listSubjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const subjects = await prisma.subject.findMany({ where: { userId } });
    res.json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteSubject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    await prisma.subject.deleteMany({ where: { id, userId } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
