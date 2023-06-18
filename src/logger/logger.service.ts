import { Injectable, Scope } from '@nestjs/common';
import { WinstonLogger } from 'nest-winston';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLoggerService extends WinstonLogger {

  log(message: any, ...optionalParams: any[]) {super.log(message, ...optionalParams); }

  error(message: any, ...optionalParams: any[]) {super.error(message, ...optionalParams);}

  warn(message: any, ...optionalParams: any[]) {super.warn(message, ...optionalParams);}

  debug(message: any, ...optionalParams: any[]) {}

  verbose(message: any, ...optionalParams: any[]) {}
}
