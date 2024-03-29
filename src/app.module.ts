import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config/app-config.module';
import { AppConfig } from './config/app.config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@/filter/http-exception.filter';
import { LoggerModule } from './config/logger/logger.module';
import { LoggerMiddleware } from '@/middleware/logger.middleware';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AppConfigModule.forRoot(AppConfig),
    DatabaseModule,
    LoggerModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    Logger,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
