import {IsNotEmpty, IsString} from "class-validator";


export class CreateArticleDto {


    @IsNotEmpty()
    @IsString()
    name : string


    @IsString()
    @IsNotEmpty()
    description : string



}
