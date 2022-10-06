import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatsRepository } from 'src/cats/cats.repository';
import { CommentsCreateDto } from 'src/dto/comments.create.dto';
import { Comments } from '../comment.schema';

@Injectable()
export class CommentsService {
    //두가지 서비스를 의존성 주입받을거
    constructor(
        @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
        private readonly catsRepository: CatsRepository,
    ) {}


    async getAllComments() {
        try {
          const comments = await this.commentsModel.find();
          return comments;
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }
    
      async createComment(id: string, commentData: CommentsCreateDto) {
        try {
          const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
            id,
          );
          const { contents, author } = commentData;
    
          const validatedAuthor =
            await this.catsRepository.findCatByIdWithoutPassword(author);
    
          const newComment = new this.commentsModel({
            author: validatedAuthor._id,
            contents,
            info: targetCat._id,
          });
          return await newComment.save();
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }
    
      async plusLike(id: string) {
        try {
          const comment = await this.commentsModel.findById(id);
          comment.likeCount += 1;
          return await comment.save();
        } catch (error) {}
      }
    
}
