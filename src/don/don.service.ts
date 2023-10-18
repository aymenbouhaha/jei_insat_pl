import {ConflictException, Injectable} from '@nestjs/common';
import { CreateDonDto } from './dto/create-don.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Don, DonDocument} from "./entities/don.entity";
import {UpdateDonDto} from "./dto/update-don.dto";

@Injectable()
export class DonService {

  constructor(
      @InjectModel(Don.name)
      private donModel: Model<DonDocument>,
  ) {
  }


  create(createDonDto: CreateDonDto) {
    try {
      const don=new this.donModel({
        ...createDonDto
      })
      return don.save()
    }catch (e) {
      throw new ConflictException("Error Occured")
    }
  }


  updateDon(updateDonDto : UpdateDonDto){
    try {
      return this.donModel.updateOne({name : updateDonDto.name},{itemsNumber : updateDonDto.itemsNumber}).exec()
    }catch (e) {
      throw new ConflictException("Error Occured")
    }
  }


  getDons(){
    return this.donModel.find()
  }



}
