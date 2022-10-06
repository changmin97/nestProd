import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, Put, Req, UploadedFiles, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { jwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { multerOptions } from 'src/common/utils/multer.options';
import { ReadOnlyCatDto } from 'src/dto/cat.dto';
import { CatRequestDto } from 'src/dto/cats.request.dto';
import { Cat } from '../cats.schema';
import { CatsService } from '../services/cats.service';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CatsController {
    constructor(
        private readonly catsService: CatsService,
        private readonly authService: AuthService,
        ) {}

    @ApiOperation({ summary : "현재 고양이 가져오기"})
    @UseGuards(jwtAuthGuard)
    @Get()
    getCurrentCat(@CurrentUser() cat) {
        return cat.readOnlyData
    }

    @ApiResponse({
        status: 500,
        description: "요청에 에러가 발생하였습니다."
    })
    @ApiResponse({
        status: 200,
        description: "회원가입에 성공하였습니다.",
        type: ReadOnlyCatDto
    })
    @ApiOperation({ summary : "회원가입"})
    @Post()
    async signUp(@Body() body: CatRequestDto) {
        return await this.catsService.signUp(body)
    }

    @ApiOperation({ summary : "로그인"})
    @Post('login')
    logIn(@Body() data: LoginRequestDto) {  
        return this.authService.jwtLogIn(data)
    }

    @ApiOperation({ summary : "로그아웃"})
    @Post('logout')
    logOut() {
        return 'logOut'
    }

    @ApiOperation({ summary : "고양이 이미지 업로드"})
    @UseInterceptors(FilesInterceptor('image',10, multerOptions("cats")))
    @UseGuards(jwtAuthGuard)
    @Post('upload')
    uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @CurrentUser() cat: Cat) {
        console.log('컨트롤러의 files정보',files)
        // return 'uploadImg'
        // return { image: `http://localhost:8000/media/cats/${files[0].filename}`}
        return this.catsService.uploadImg(cat, files)
    }

    @ApiOperation({ summary : "모든 고양이 가져오기"})
    @Get('all')
    getallCat() {
        return this.catsService.getAllCat()
    }

}
