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
exports.CatsService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const cats_repository_1 = require("../cats.repository");
let CatsService = class CatsService {
    constructor(catsRepository) {
        this.catsRepository = catsRepository;
    }
    async signUp(body) {
        const { email, name, password } = body;
        const isCatExist = await this.catsRepository.existsByEmail(email);
        if (isCatExist) {
            throw new common_1.HttpException('해당하는 이메일은 이미 존재합니다.', 403);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const cat = await this.catsRepository.create({
            email,
            name,
            password: hashedPassword,
        });
        return cat.readOnlyData;
    }
    async uploadImg(cat, files) {
        const fileName = `cats/${files[0].filename}`;
        console.log(fileName);
        const newCat = await this.catsRepository.findByIdAndUpdateImg(cat.id, fileName);
        console.log(newCat);
        return newCat;
    }
    async getAllCat() {
        const allCat = await this.catsRepository.findAll();
        const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
        return readOnlyCats;
    }
};
CatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cats_repository_1.CatsRepository])
], CatsService);
exports.CatsService = CatsService;
//# sourceMappingURL=cats.service.js.map