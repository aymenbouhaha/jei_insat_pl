import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import * as dotenv from "dotenv";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./entities/user.entity";
import {JwtStrategy} from "./strategy/passport-jwt.strategy";


dotenv.config()
@Module({
  imports : [
    MongooseModule.forFeature([
      {name : User.name, schema : UserSchema}
    ]),
    PassportModule.register({
      defaultStrategy : "jwt"
    }),
    JwtModule.register({
      secret : process.env.SECRET,
      signOptions : {
        expiresIn : "15d"
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy]
})
export class UserModule {}
