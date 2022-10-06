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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../../auth/auth.service");
const login_request_dto_1 = require("../../auth/dto/login.request.dto");
const jwt_guard_1 = require("../../auth/jwt/jwt.guard");
const user_decorator_1 = require("../../common/decorators/user.decorator");
const http_exception_filter_1 = require("../../common/exceptions/http-exception.filter");
const success_interceptor_1 = require("../../common/interceptors/success.interceptor");
const multer_options_1 = require("../../common/utils/multer.options");
const cat_dto_1 = require("../../dto/cat.dto");
const cats_request_dto_1 = require("../../dto/cats.request.dto");
const cats_schema_1 = require("../cats.schema");
const cats_service_1 = require("../services/cats.service");
let CatsController = class CatsController {
    constructor(catsService, authService) {
        this.catsService = catsService;
        this.authService = authService;
    }
    getCurrentCat(cat) {
        return cat.readOnlyData;
    }
    async signUp(body) {
        return await this.catsService.signUp(body);
    }
    logIn(data) {
        return this.authService.jwtLogIn(data);
    }
    logOut() {
        return 'logOut';
    }
    uploadFile(files, cat) {
        console.log('컨트롤러의 files정보', files);
        return this.catsService.uploadImg(cat, files);
    }
    getallCat() {
        return this.catsService.getAllCat();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "현재 고양이 가져오기" }),
    (0, common_1.UseGuards)(jwt_guard_1.jwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "getCurrentCat", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "요청에 에러가 발생하였습니다."
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "회원가입에 성공하였습니다.",
        type: cat_dto_1.ReadOnlyCatDto
    }),
    (0, swagger_1.ApiOperation)({ summary: "회원가입" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cats_request_dto_1.CatRequestDto]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "로그인" }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_request_dto_1.LoginRequestDto]),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "logIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "로그아웃" }),
    (0, common_1.Post)('logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "logOut", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "고양이 이미지 업로드" }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image', 10, (0, multer_options_1.multerOptions)("cats"))),
    (0, common_1.UseGuards)(jwt_guard_1.jwtAuthGuard),
    (0, common_1.Post)('upload'),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, cats_schema_1.Cat]),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "uploadFile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "모든 고양이 가져오기" }),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "getallCat", null);
CatsController = __decorate([
    (0, common_1.Controller)('cats'),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    __metadata("design:paramtypes", [cats_service_1.CatsService,
        auth_service_1.AuthService])
], CatsController);
exports.CatsController = CatsController;
//# sourceMappingURL=cats.controller.js.map