import { TaskCategories, TaskPriority } from "@prisma/client"
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class createTaskDTO{
    @IsNotEmpty()
    @IsString()
    title! : string
    
    @IsNotEmpty()
    @IsString()
    description! : string

    @IsNotEmpty()
    @IsString()
    courseId! : string

    @IsNotEmpty()
    @IsString()
    userId! : string

    @IsNotEmpty()
    @IsString()
    category! : TaskCategories

    @IsNotEmpty()
    dueDate! : Date

    @IsNotEmpty()
    dueTime! : string
    
    @IsNotEmpty()
    @IsString()
    priority! : TaskPriority

    @IsNotEmpty()
    estimatedHours! : number
}