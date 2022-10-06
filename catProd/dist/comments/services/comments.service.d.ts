/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { CatsRepository } from 'src/cats/cats.repository';
import { CommentsCreateDto } from 'src/dto/comments.create.dto';
import { Comments } from '../comment.schema';
export declare class CommentsService {
    private readonly commentsModel;
    private readonly catsRepository;
    constructor(commentsModel: Model<Comments>, catsRepository: CatsRepository);
    getAllComments(): Promise<(Comments & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    createComment(id: string, commentData: CommentsCreateDto): Promise<Comments & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    plusLike(id: string): Promise<Comments & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
