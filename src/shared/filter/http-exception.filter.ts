import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getHttpMessage } from './http-exception.filter.utils';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    //валидация ошибок + если ошибка не определена internal error

    const errorResponse = {
      statusCode: status,
      message: getHttpMessage(status),
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json({ errorResponse });

    Logger.error(`${request.method} ${request.url}`, 'HttpExceptionFilter');
  }
}
