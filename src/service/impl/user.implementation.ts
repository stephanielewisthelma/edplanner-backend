import { db } from "../../config/db";
import { User } from "@prisma/client";
import { createUserDTO } from "../../dtos/userDTO.dto";
import { hashPassword } from "../../utils/password.utils";
import { comparePassword } from "../../utils/password.utils";
import { CustomError } from "../../utils/customError.utils";
import { userServices } from "../user.service";

export class userServiceImplementation implements userServices {
  async registerUser(data: createUserDTO): Promise<User> {
    const isUser = await db.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (isUser) {
      throw new CustomError(404, "User with this email already exists");
    }

    const user = await db.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: await hashPassword(data.password),
      },
    });
    return user;
  }

  async getUserbyId(id: number): Promise<User | null> {
    const user = await db.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new CustomError(404, "User not found");
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.user.findMany();
  }

  async updateUser(id: number, data: Partial<createUserDTO>): Promise<User> {
    const isUserExist = await db.user.update({
      where: { id },
      data,
    });
    if (!isUserExist) {
      throw new CustomError(404, "User doesn't exist in the database");
    }
    const user = await db.user.update({
      where: { id },
      data,
    });
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    await db.user.delete({
      where: { id },
    });
  }
}
