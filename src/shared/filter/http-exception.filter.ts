import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    //валидация ошибок + если ошибка не определена internal error
    const errorResponse = {
      statusCode: status,
      method: request.method,
      message: exception.message || null,
      error: exception.name,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json({ errorResponse });

    Logger.error(`${request.method} ${request.url}`, 'HttpExceptionFilter');
  }
}
