import {Prop} from "@nestjs/mongoose";


export class LoginDto  {


    @Prop({required : true})
    email : string

    @Prop({required : true})
    password : string


}
