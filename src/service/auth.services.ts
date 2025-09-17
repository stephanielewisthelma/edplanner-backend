import { LoginDTO } from "../dtos/userLoginDTO.dto";

export interface AuthServices{
    login(data: LoginDTO): Promise<{accessToken: string, refreshToken:string}>
}