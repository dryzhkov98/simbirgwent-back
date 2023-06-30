import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLoggerService } from '../../config/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(MyLoggerService.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const regex:RegExp = /^([45])/;
    res.on('close', (): void => {
      if (!regex.test(res.statusCode.toString())){
        this.logger.log(
          `\n[status]: ${res.statusCode}\n[host]: ${
            req?.headers?.host
          }\n[body]: ${JSON.stringify(req?.body)} `,
        );
      }
    });
    next();
  }
}
