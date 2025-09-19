import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class LoginDTO{
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 20)
    password!: string
}