import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus, Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getHttpMessage } from './utils';
import { MyLoggerService } from '../../config/logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger:Logger = new Logger(MyLoggerService.name);
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      message: getHttpMessage(status),
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json({ errorResponse });

    this.logger.error(
      `${getHttpMessage(status)} \n[status]: ${response.statusCode}\n[host]: ${
        request?.headers?.host
      }\n[body]: ${JSON.stringify(request?.body)}`,
    );
  }
}
