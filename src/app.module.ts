import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { DonModule } from './don/don.module';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {RequestLoggingInterceptor} from "./log.interceptor";

@Module({
  imports: [
      UserModule,
    ArticleModule,
    DonModule,
    MongooseModule.forRoot("mongodb+srv://junior-entreprise:8Wd0RRYKjbUTWvtP@cluster0.09npplj.mongodb.net/?retryWrites=true&w=majority",),
    ConfigModule.forRoot({
      isGlobal : true
    }),
  ],
  controllers: [AppController],
  providers: [
      AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: RequestLoggingInterceptor,
    // }
  ],
})
export class AppModule {}
