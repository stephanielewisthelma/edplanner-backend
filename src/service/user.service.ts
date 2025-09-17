import { createUserDTO } from "../dtos/userDTO.dto";
import { User } from "@prisma/client";

export interface userServices {
  registerUser(data: createUserDTO): Promise<User>;
  getUserbyId(id: number): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: number, data: Partial<createUserDTO>): Promise<User>;
  deleteUser(id: number): Promise<void>;
}
