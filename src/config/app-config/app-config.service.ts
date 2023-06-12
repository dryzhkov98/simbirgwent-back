import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { APP_CONFIG } from '../app.config.constants';
import { ApplicationConfig } from '@nestjs/core';
import { formatErrorMessage } from '@/utils/index';

@Injectable()
export class AppConfigService<T extends ApplicationConfig> {
  private readonly appConfig: T;
  constructor(@Inject(APP_CONFIG) appConfig: new () => T) {
    this.appConfig = this.validate(appConfig);
  }

  private validate(appConfig: new () => T) {
    const validatedConfig = plainToInstance(appConfig, process.env, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      const message = formatErrorMessage(errors);
      throw new Error(message);
    }
    return validatedConfig;
  }

  get<V>(key: keyof T): V {
    const value = this.appConfig[key] as V;

    if (value == null)
      throw new Error('There is no such value with specified type and key.');

    return value;
  }
}
