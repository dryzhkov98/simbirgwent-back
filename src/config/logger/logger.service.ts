import { Injectable, Scope } from '@nestjs/common';
import { WinstonLogger } from 'nest-winston';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLoggerService extends WinstonLogger {
  log(message: unknown): void {
    super.log(message);
  }

  error(message: unknown): void {
    super.error(message);
  }

  warn(message: unknown): void {
    super.warn(message);
  }
}
