import { signUpDTO } from "../dtos/signUp.dto";
import { LoginDTO } from "../dtos/userLoginDTO.dto";
import { User } from "../generated/prisma";

export interface AuthServices{
    login(data: LoginDTO): Promise<{accessToken: string, refreshToken:string}>
    signup(data: signUpDTO): Promise<Partial<User>>;
}