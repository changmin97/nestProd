import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() //전달하는 메세지를 getResponse로 받을 수 있음

    response
      .status(status)  
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        success: false,
        error
      });
  }
}