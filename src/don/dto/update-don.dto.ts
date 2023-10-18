import {IsIn, IsNumber, IsString} from "class-validator";


export class UpdateDonDto {

    @IsString()
    @IsIn(["food","money","clothes","medicines"])
    name : string

    @IsNumber()
    itemsNumber : number

}
