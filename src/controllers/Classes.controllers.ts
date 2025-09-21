import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ClassDTO } from "../dtos/class.dto";


export const createClass = async (req: AuthRequest, res: Response) => {
  try {
    const { title, location, startTime, endTime, subjectId }: CreateClassDTO = req.body;
    if (!title || !startTime || !endTime || !subjectId) return res.status(400).json({ message: "missing fields" });

    const cls = await prisma.class.create({
      data: {
        title,
        location,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        subjectId,
      },
    });
    res.status(201).json(cls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listClasses = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const classes = await prisma.class.findMany({
      where: { subject: { userId } },
      include: { subject: true },
      orderBy: { startTime: "asc" },
    });
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteClass = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.class.deleteMany({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
