import { Response, Request, NextFunction } from "express";
import { userServiceImplementation } from "../service/impl/user.implementation";
import { createUserDTO } from "../dtos/userDTO.dto";

export class UserController {
  private userService: userServiceImplementation;

  constructor() {
    this.userService = new userServiceImplementation();
  }

  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData = req.body as createUserDTO;
      const newUser = await this.userService.registerUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };
  public getUserbyId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    try {
      const userId = parseInt(req.params.id);
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
      const userId = parseInt(req.params.id);
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
      const userId = parseInt(req.params.id);
      const user = await this.userService.deleteUser(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
