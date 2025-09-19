import type { NextFunction, Request, Response } from "express";
import { AuthServicesImpl } from "../service/impl/auth.implementation";
import { LoginDTO } from "../dtos/userLoginDTO.dto";
import { signUpDTO } from "../dtos/signUp.dto";

export class AuthController {
  private authService: AuthServicesImpl;

  constructor() {
    this.authService = new AuthServicesImpl();
  }

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: LoginDTO = req.body;
      const {accessToken, refreshToken} = await this.authService.login(data);
      res.status(200).json({accessToken, refreshToken})
    } catch (error) {
      next(error);
    }
  };


  public signup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: signUpDTO = req.body;
      const newUser = await this.authService.signup(data);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

}
