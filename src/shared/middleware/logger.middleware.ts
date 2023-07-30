import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../../config/logger/logger.service';
import { hidePassword } from '@/utils/index';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const regex = /^([45])/;
    res.on('close', (): void => {
      if (!regex.test(res.statusCode.toString())) {
        this.logger.log(
          `\n[status]: ${res.statusCode}\n[host]: ${
            req?.headers?.host
          }\n[body]: ${JSON.stringify(hidePassword(req.body))} `,
        );
      }
    });
    next();
  }
}
