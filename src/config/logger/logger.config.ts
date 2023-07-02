import { format, transports } from 'winston';
import { WinstonModuleOptions } from 'nest-winston';
import 'winston-daily-rotate-file';
import { AppConfigService } from '../app-config/app-config.service';
import { AppConfig } from '../app.config';

const config = new AppConfigService(AppConfig);

export function getConfigLogger(): WinstonModuleOptions {
  return {
    transports: [
      new transports.DailyRotateFile({
        filename: `logs/%DATE%-error.log`,
        level: 'error',
        format: format.combine(format.timestamp(), format.json()),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxFiles: '2d',
      }),
      new transports.DailyRotateFile({
        filename: `logs/%DATE%-combined.log`,
        format: format.combine(format.timestamp(), format.json()),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxFiles: '2d',
      }),
      new transports.Console({
        format: format.combine(
          format.cli({ all: true, colors: { info: 'green', error: 'red' } }),
          format.splat(),
          format.timestamp({ format: new Date().toLocaleString('ru-Ru') }),
          format.printf((info) => {
            const appName = config.get<string>('NAME');
            return `[${appName}] ${info.level} ${info.timestamp}${info.message}`;
          }),
        ),
      }),
    ],
  };
}
