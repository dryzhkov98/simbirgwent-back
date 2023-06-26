import { Module } from '@nestjs/common';
import { MyLoggerService } from './logger.service';
import { WinstonModule } from 'nest-winston';

@Module({
  providers: [MyLoggerService],
  exports: [MyLoggerService]
})
export class LoggerModule extends  WinstonModule{}
