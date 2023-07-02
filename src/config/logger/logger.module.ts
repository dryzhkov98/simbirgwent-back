import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { WinstonModule } from 'nest-winston';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule extends WinstonModule {}
