import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config/app-config.module';
import { AppConfig } from './config/app.config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@/filter/http-exception.filter';
import { LoggerModule } from './config/logger/logger.module';
import { LoggerMiddleware } from '@/middleware/logger.middleware';
import { TestApiModule } from './modules/test-api/test-api.module';

@Module({
  imports: [AppConfigModule.forRoot(AppConfig), LoggerModule, TestApiModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
