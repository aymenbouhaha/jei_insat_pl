import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";



export type ArticleDocument = HydratedDocument<Article>;


@Schema()
export class Article {


    _id;

    @Prop({required : true})
    name : string

    @Prop({required : true})
    description : string

    @Prop({required : true})
    imageData : Buffer

    @Prop({required : true})
    imageType : string

}


export const ArticleSchema = SchemaFactory.createForClass(Article)
