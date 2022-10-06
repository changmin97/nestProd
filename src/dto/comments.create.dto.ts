import { PickType } from "@nestjs/swagger";
import { Comments } from "src/comments/comment.schema";


export class CommentsCreateDto extends PickType(Comments, ['author', 'contents'] as const) {}