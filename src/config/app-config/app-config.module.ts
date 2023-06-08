import { DynamicModule, Global, Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { APP_CONFIG } from '../app.config.constants';
import { config } from 'dotenv';

@Global()
@Module({})
export class AppConfigModule {
  static forRoot(appConfig: Record<string, unknown>): DynamicModule {
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

  static init(config: Record<string, unknown>) {
    return new AppConfigService(config).appConfig;
  }
}
