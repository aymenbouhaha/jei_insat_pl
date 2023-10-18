import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./entities/user.entity";
import {SignUpDto} from "./dto/sign-up.dto";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "./dto/login.dto";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private jwtService : JwtService,
    ) {
    }


    async signUp(signUpDto : SignUpDto){
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(signUpDto.password,salt)
        const user=new this.userModel({
            ...signUpDto,
            password : password,
            salt : salt,
        })
        try {
            return await user.save()
        }catch (e) {
            throw e
        }
    }

    async login(loginDto : LoginDto){
        const user = await this.findUserByMail(loginDto.email)
        if (!user){
            throw new NotFoundException("email doesn't exist")
        }
        const hashedPassword = await bcrypt.hash(loginDto.password,user.salt)
        if (hashedPassword != user.password){
            throw new BadRequestException("Wrong Password")
        }
        const payload= {
            email : user.email,
            name : user.name
        }
        const token = this.jwtService.sign(payload)
        return {
            token : token
        }
    }

    async findUserByMail(email : string){
       return this.userModel.findOne({email : email} )
    }


}
