import { IsEmail, IsNotEmpty, Length } from "class-validator"

export class signUpDTO{
    @IsNotEmpty()
    @Length(2, 60)
    fullName! : string
    
    @IsNotEmpty()
    @IsEmail()
    email! : string

    @IsNotEmpty()
    @Length(8, 20)
    password! : string
}