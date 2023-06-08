import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AppConfig } from '../app.config';
import { validateSync } from 'class-validator';
import { APP_CONFIG } from '../app.config.constants';

@Injectable()
export class AppConfigService {
  public appConfig: AppConfig;
  constructor(@Inject(APP_CONFIG) config: Record<string, unknown>) {
    this.appConfig = this.validate(config);
  }

  private validate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(AppConfig, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  }
}
