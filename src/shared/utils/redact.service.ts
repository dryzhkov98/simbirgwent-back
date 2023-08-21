import { AppConfigModule } from '../../config/app-config/app-config.module';
import { AppConfig } from '../../config/app.config';

export class RedactService {
  private sensitiveKeys: RegExp[];

  constructor() {
    const configService = AppConfigModule.init(AppConfig);
    this.sensitiveKeys = configService
      .get<string>('SENSITIVE_KEYS')
      .split(', ')
      .map((key) => new RegExp(key, 'i'));
  }

  private isSensitiveKey(key: string): boolean {
    return this.sensitiveKeys.some((sk) => sk.test(key));
  }

  redact<T>(value: T): T {
    if (typeof value !== 'object' || value == null) {
      return value;
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.redact(item)) as T;
    }

    const clone = {} as T;
    for (const key in value) {
      if (this.isSensitiveKey(key)) {
        clone[key] = '[REDACTED]' as T[Extract<keyof T, string>];
      } else {
        clone[key] = this.redact(value[key]);
      }
    }

    // to iterate symbol keys
    for (const key of Object.getOwnPropertySymbols(value)) {
      const symbolKey = key as keyof T;
      clone[symbolKey] = this.redact(value[symbolKey]);
    }

    return clone;
  }
}
