import { createCourseDTO } from "../dtos/addCourse.dto";
import { createTaskDTO } from "../dtos/addTask.dto";
import { createUserDTO } from "../dtos/userDTO.dto";
import { Course, Task, User } from "@prisma/client";

export interface userServices {
  getUserbyId(id: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: string, data: Partial<createUserDTO>): Promise<Partial<User>>;
  deleteUser(id: string): Promise<void>;
  addNewTask(data: createTaskDTO): Promise<Task>;
  addNewCourse(data: createCourseDTO): Promise<Course>;
}
