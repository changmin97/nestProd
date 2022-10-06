import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { AwsService } from './aws.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly awsService: AwsService,
    
    ) {}

  @Get()
  getHello(): string {
    return 'for aws s3';
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('image'))
  // async uploadMediaFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file) 
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMediaFile(@UploadedFile() file: Express.Multer.File) {
    return this.awsService.uploadFileToS3('cats',file)
  }

  @Post('cats') // @Post(':key') 로 하면 localhost:8000/cats/1665042573716_testDog.jpg 이렇게 /cats/떄문에 동적 라우팅 안됨 => Post body로 key값 받기
  getImageUrl(@Body('key') key: string) {
    return this.awsService.getAwsS3FileUrl(key)
  }

}
