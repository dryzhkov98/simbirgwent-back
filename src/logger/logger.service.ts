import { Injectable, Scope } from '@nestjs/common';
import { WinstonLogger } from 'nest-winston';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLoggerService extends WinstonLogger {

  log(message: unknown) {super.log(message); }

  error(message: unknown) {super.error(message);}

  warn(message: unknown) {super.warn(message);}

  debug(message: unknown) {}

  verbose(message: unknown) {}
}
