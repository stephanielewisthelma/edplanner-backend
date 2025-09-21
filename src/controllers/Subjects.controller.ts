import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { SubjectDTO } from "../dtos/subject.dto";

// Create subject
export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name, description }: SubjectDTO = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });

    const subject = await prisma.subject.create({
      data: {
        name,
        description: description ?? null, // ✅ fixed
      },
    });

    res.status(201).json(subject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all subjects
export const getSubjects = async (_req: Request, res: Response) => {
  try {
    const subjects = await prisma.subject.findMany({
      include: { classes: true, tasks: true },
    });
    res.json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get subject by ID
export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Subject ID required" });

    const subject = await prisma.subject.findUnique({
      where: { id },
      include: { classes: true, tasks: true },
    });

    if (!subject) return res.status(404).json({ message: "Subject not found" });

    res.json(subject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update subject
export const updateSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description }: SubjectDTO = req.body;

    if (!id) return res.status(400).json({ message: "Subject ID required" });

    const updated = await prisma.subject.update({
      where: { id },
      data: {
        name,
        description: description ?? null, // ✅ fixed
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete subject
export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Subject ID required" });

    await prisma.subject.deleteMany({ where: { id } });

    res.json({ message: "Subject deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
