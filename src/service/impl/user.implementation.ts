import { db } from "../../config/db";
import { Course, Task, User } from "@prisma/client";
import { createUserDTO } from "../../dtos/userDTO.dto";
import { CustomError } from "../../utils/customError.utils";
import { userServices } from "../user.service";
import { StatusCodes } from "http-status-codes";
import { createTaskDTO } from "../../dtos/addTask.dto";
import { createCourseDTO } from "../../dtos/addCourse.dto";

export class userServiceImplementation implements userServices {
  
  async getUserbyId(id: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new CustomError(StatusCodes.NOT_FOUND, "User not found");
    }
    return user;
  }
  
  
  async getAllUsers(): Promise<User[]> {
    return await db.user.findMany();
  }
  
  
  async updateUser(id: string, data: Partial<createUserDTO>): Promise<Partial<User>> {
    const user = await db.user.findUnique({
      where: { id },
    });
    
    if (!user) {
      throw new CustomError(StatusCodes.NOT_FOUND, "User not found");
    }
    
    const updatedUser = await db.user.update({
      where: { id },
      data,
      omit: {
        password: true
      }
    });
    
    return updatedUser;
  }
  
  
  async deleteUser(id: string): Promise<void> {
    await db.user.delete({
      where: { id },
    });
  }
  
  
  async addNewTask(data: createTaskDTO): Promise<Task> {
    const newTask = await db.task.create({
      data
    });

    return newTask;
  }
  
  
  async addNewCourse(data: createCourseDTO): Promise<Course> {
    const course = await db.course.findUnique({
      where: {courseCode: data.courseCode}
    });

    if(course) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "Course code is registered already");
    }

    const newCourse = await db.course.create({
      data
    })

    return newCourse;
  }

}
