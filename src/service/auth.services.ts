import { LoginDTO } from "../dtos/userLoginDTO.dto.js";

export interface AuthServices{
    login(data: LoginDTO): Promise<{accessToken: string, refreshToken:string}>
}