import  { IsEmail, IsNotEmpty, Length } from "class-validator"

export class createUserDTO{
    @IsNotEmpty()
    @Length(2, 60)
    firstName! : string
    
    @IsNotEmpty()
    @Length(2, 60)
    lastName! : string

    @IsEmail()
    email! : string

    @IsNotEmpty()
    @Length(8, 20)
    password! : string
}