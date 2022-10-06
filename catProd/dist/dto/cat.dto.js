"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadOnlyCatDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const cats_schema_1 = require("../cats/cats.schema");
class ReadOnlyCatDto extends (0, swagger_1.PickType)(cats_schema_1.Cat, ['email', 'name']) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "63331911k63f02afd1836a5h",
        description: "id"
    }),
    __metadata("design:type", String)
], ReadOnlyCatDto.prototype, "id", void 0);
exports.ReadOnlyCatDto = ReadOnlyCatDto;
//# sourceMappingURL=cat.dto.js.map