import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors} from '@nestjs/common';
import { DonService } from './don.service';
import { CreateDonDto } from './dto/create-don.dto';
import {UpdateDonDto} from "./dto/update-don.dto";
import {JwtAuthGuard} from "../user/guards/jwt-auth.guard";

@Controller('don')
export class DonController {
  constructor(private readonly donService: DonService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createDonDto: CreateDonDto) {
    return this.donService.create(createDonDto);
  }


  @Patch()
  @UseGuards(JwtAuthGuard)
  updateDon(@Body() updateDonDto : UpdateDonDto){
    return this.donService.updateDon(updateDonDto)
  }

  @Get()
  findAll() {
    return this.donService.getDons();
  }






}
