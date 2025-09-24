import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../utils/prisma";
import { CreateUserDTO, LoginDTO, UserResponseDTO } from "../dtos/userDTO.dto";

dotenv.config();

const SALT_ROUNDS = 10;

// --- helpers ---
function signAccessToken(user: any) {
  const options: SignOptions = {
    expiresIn: (process.env.ACCESS_TOKEN_EXPIRY || "15m") as any,
  };

  return jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET || "defaultsecret",
    options
  );
}

function signRefreshToken(user: any) {
  const options: SignOptions = {
    expiresIn: `${process.env.REFRESH_TOKEN_EXPIRY_DAYS || 30}d` as any,
  };

  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || "defaultsecret",
    options
  );
}

// --- register ---
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: CreateUserDTO = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password required" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: {
        name: name ?? null, 
        email,
        password: hashed,
      },
    });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(
          Date.now() +
            Number(process.env.REFRESH_TOKEN_EXPIRY_DAYS || 30) *
              24 *
              60 *
              60 *
              1000
        ),
      },
    });

    const response: UserResponseDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    res.status(201).json({ user: response, accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// --- login ---
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginDTO = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(
          Date.now() +
            Number(process.env.REFRESH_TOKEN_EXPIRY_DAYS || 30) *
              24 *
              60 *
              60 *
              1000
        ),
      },
    });

    const response: UserResponseDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    res.json({ user: response, accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// --- refresh ---
export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "refresh token required" });
    }

    const stored = await prisma.refreshToken.findUnique({ where: { token } });
    if (!stored) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET || "defaultsecret"
      ) as any;

      const user = await prisma.user.findUnique({ where: { id: payload.id } });
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const accessToken = signAccessToken(user);
      res.json({ accessToken });
    } catch (err) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
