import { DynamicModule, Global, Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { APP_CONFIG } from '../app.config.constants';
import { config } from 'dotenv';
import { ApplicationConfig } from '@nestjs/core';

@Global()
@Module({})
export class AppConfigModule {
  static forRoot<T extends ApplicationConfig>(
    appConfig: new () => T,
  ): DynamicModule {
    config();
    return {
      module: AppConfigModule,
      providers: [
        {
          provide: APP_CONFIG,
          useValue: appConfig,
        },
        AppConfigService,
      ],
      exports: [AppConfigService],
    };
  }

  static init<T extends ApplicationConfig>(
    config: new () => T,
  ): AppConfigService<T> {
    return new AppConfigService(config);
  }
}
