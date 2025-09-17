import { IsNotEmpty, IsNumber, Length } from "class-validator";
export class createProductDTO{
    @IsNotEmpty()
    @Length(2, 100)
    title! : string

    @IsNotEmpty()
    @IsNumber()
    price!:number

    @IsNotEmpty()
    @Length(20, 250)
    description! :string
}