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

  redact<T>(obj: T): T {
    if (typeof obj !== 'object' || obj == null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.redact(item)) as T;
    }

    const clone = {} as T;
    for (const key in obj) {
      if (this.isSensitiveKey(key)) {
        clone[key] = '[REDACTED]' as T[Extract<keyof T, string>];
      } else {
        clone[key] = this.redact(obj[key]);
      }
    }

    // to iterate symbol keys
    for (const key of Object.getOwnPropertySymbols(obj)) {
      const symbolKey = key as keyof T;
      clone[symbolKey] = this.redact(obj[symbolKey]);
    }

    return clone;
  }
}
