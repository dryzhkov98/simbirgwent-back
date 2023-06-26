import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLoggerService } from '../../config/logger/logger.service';
import { getHttpMessage } from '@/filter/utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(MyLoggerService.name);

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const statusCode = res.statusCode;
      if ([401, 405, 404, 400, 500, 403].includes(statusCode)) {
        this.logger.error(getHttpMessage(statusCode));
      }
    });
    next();
  }
}