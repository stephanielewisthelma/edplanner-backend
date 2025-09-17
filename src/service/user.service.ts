import { createUserDTO } from "../dtos/userDTO.dto";
import { User } from "@prisma/client";

export interface userServices {
  getUserbyId(id: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: string, data: Partial<createUserDTO>): Promise<Partial<User>>;
  deleteUser(id: string): Promise<void>;
}
