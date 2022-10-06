import { Comments } from "src/comments/comment.schema";
declare const CommentsCreateDto_base: import("@nestjs/common").Type<Pick<Comments, "author" | "contents">>;
export declare class CommentsCreateDto extends CommentsCreateDto_base {
}
export {};
