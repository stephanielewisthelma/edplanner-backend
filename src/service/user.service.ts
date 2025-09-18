import { createTaskDTO } from "../dtos/addTask.dto";
import { createUserDTO } from "../dtos/userDTO.dto";
import { Task, User } from "@prisma/client";

export interface userServices {
  getUserbyId(id: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: string, data: Partial<createUserDTO>): Promise<Partial<User>>;
  deleteUser(id: string): Promise<void>;
  addNewTask(data: createTaskDTO): Promise<Task>;
}
