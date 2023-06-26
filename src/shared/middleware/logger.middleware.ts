import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLoggerService } from '../../config/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(MyLoggerService.name);

  use(req: Request, res: Response, next: NextFunction): void {
    res.on('close', (): void => {
      this.logger.log(
        `\n[status]: ${res.statusCode}\n[host]: ${
          req?.headers?.host
        }\n[body]: ${JSON.stringify(req?.body)} `,
      );
    });
    next();
  }
}
