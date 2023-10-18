import {IsIn, IsNotEmpty, IsNumber} from "class-validator";

export class CreateDonDto {

    @IsNotEmpty()
    @IsIn(["food","money","clothes","medicines"])
    name : string

    @IsNumber()
    itemsNumber : number


}
