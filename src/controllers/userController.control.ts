import { Response, Request, NextFunction } from "express";
import { userServiceImplementation } from "../service/impl/user.implementation";
import type { createUserDTO } from "../dtos/userDTO.dto";
import { createTaskDTO } from "../dtos/addTask.dto";
import { StatusCodes } from "http-status-codes";
import { createCourseDTO } from "../dtos/addCourse.dto";

export class UserController {
  private userService: userServiceImplementation;

  constructor() {
    this.userService = new userServiceImplementation();
  }

  public getUserbyId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    try {
      const userId = req.params.id as string;
      const user = await this.userService.getUserbyId(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };


  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };


  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    try {
      const userId = req.params.id as string;
      const userData = req.body as Partial<createUserDTO>;
      const updateUser = await this.userService.updateUser(userId, userData);
      res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  };


  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.params.id as string;
      await this.userService.deleteUser(userId);
      res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
      next(error);
    }
  };


  public addNewTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: createTaskDTO = req.body;
      const newTask = await this.userService.addNewTask(data);
      res.status(StatusCodes.CREATED).json(newTask);
    } catch (error) {
      next(error);
    }
  }


  public addNewCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: createCourseDTO = req.body;
      const newCourse = await this.userService.addNewCourse(data);
      res.status(StatusCodes.CREATED).json(newCourse);
    } catch (error) {
      next(error);
    }
  }
}
