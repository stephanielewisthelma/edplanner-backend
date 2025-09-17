import { LoginDTO } from "../../dtos/userLoginDTO.dto";
import { AuthServices } from "../auth.services";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CustomError } from "../../utils/customError.utils";
import { comparePassword } from "../../utils/password.utils";
import { signUpDTO } from "../../dtos/signUp.dto";
import { User } from "../../generated/prisma";
import { db } from "../../config/db";

dotenv.config();

export class AuthServicesImpl implements AuthServices {

  async signup(data: signUpDTO): Promise<User> {
    throw new Error("Method not implemented.");
  };


  async login(data: LoginDTO): Promise<{accessToken: string, refreshToken: string}> {
    const user = await db.user.findUnique({
      where: {email: data.email}
    });

    if (!user) {
      throw new CustomError(404, "User not found");
    }

    const isPasswordValid = await comparePassword(data.password, user.password);
    if(!isPasswordValid){
      throw new CustomError(401, "Invalid password or email");
    }

    const accessToken = this.generateAccessToken(user.id, user.fullName);
    const refreshToken = this.generateRefreshToken(user.id, user.fullName);

    return {accessToken, refreshToken}
  }


  generateAccessToken(userId: string, name: string): string {
    return jwt.sign(
      {userId, name},
      process.env.JWT_SECRET as string || "",
      {expiresIn: "2d"}
    )
  }

  generateRefreshToken(userId: string, name: string): string {
    return jwt.sign(
      {userId, name},
      process.env.JWT_SECRET as string || "",
      {expiresIn: "2d"}
    )
  }
}
