import {ConflictException, Injectable} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Article, ArticleDocument} from "./entities/article.entity";

@Injectable()
export class ArticleService {

  constructor(
      @InjectModel(Article.name)
      private donModel: Model<ArticleDocument>,
  ) {
  }

  async create(createArticleDto: CreateArticleDto, image: Express.Multer.File) {
    const article = new this.donModel({
      name: createArticleDto.name,
      description: createArticleDto.description,
      imageData: image.buffer,
      imageType: image.mimetype
    })
    try {
      return await article.save()
    } catch (e) {
      throw new ConflictException("Error Occured When Saving The Article")
    }
  }

  findAll() {
    return this.donModel.find();
  }

  findOne(id: string) {
    return this.donModel.findOne({_id: id});
  }


}
