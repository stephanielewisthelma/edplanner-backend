import { IsNotEmpty, IsString } from "class-validator"


export class createCourseDTO{
    @IsNotEmpty()
    @IsString()
    courseCode! : string
    
    @IsNotEmpty()
    @IsString()
    title! : string

    @IsNotEmpty()
    @IsString()
    teacher! : string

    @IsNotEmpty()
    @IsString()
    userId! : string

}