import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from 'src/cats/cats.module';
import { Comments, CommentsSchema } from './comment.schema';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comments.name, schema: CommentsSchema }]),
    CatsModule, //이거 추가해서 해결함
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
