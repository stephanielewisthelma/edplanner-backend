
import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

// get current user profile
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// update profile (only name for now)
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { name } = req.body;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { name: name ?? null }, 
      select: { id: true, email: true, name: true },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
