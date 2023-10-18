import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";



export type DonDocument = HydratedDocument<Don>;


@Schema()
export class Don {


    _id

    @Prop({required : true, unique : true})
    name : string

    @Prop({required : true})
    itemsNumber : number


}

export const DonSchema = SchemaFactory.createForClass(Don)
