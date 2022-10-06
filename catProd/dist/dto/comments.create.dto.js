"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const comment_schema_1 = require("../comments/comment.schema");
class CommentsCreateDto extends (0, swagger_1.PickType)(comment_schema_1.Comments, ['author', 'contents']) {
}
exports.CommentsCreateDto = CommentsCreateDto;
//# sourceMappingURL=comments.create.dto.js.map