import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {Express} from "express";
import {JwtAuthGuard} from "../user/guards/jwt-auth.guard";

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
      FileInterceptor('image', {
        fileFilter : (req, file, callback)=>{
          if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return callback(new BadRequestException('Vous pouvez ajouter que des images'), false);
          }
          callback(null, true);
        },
      }),
  )
  create(@Body() createArticleDto: CreateArticleDto,@UploadedFile() image : Express.Multer.File) {
    return this.articleService.create(createArticleDto,image);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }


}
