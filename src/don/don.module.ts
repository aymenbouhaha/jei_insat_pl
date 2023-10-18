import { Module } from '@nestjs/common';
import { DonService } from './don.service';
import { DonController } from './don.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Don, DonSchema} from "./entities/don.entity";

@Module({
  imports : [
    MongooseModule.forFeature([
      {name : Don.name, schema : DonSchema}
    ]),
  ],
  controllers: [DonController],
  providers: [DonService]
})
export class DonModule {}
