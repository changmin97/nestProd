import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/controllers/cats.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { AwsService } from './aws.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, }),CatsModule, MongooseModule.forRoot(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }), AuthModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService, AwsService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
      mongoose.set('debug',this.isDev)
  }
}
