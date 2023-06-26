import { format, transports } from 'winston';
import { LoggerModule } from './logger.module';
import { WinstonModuleOptions } from 'nest-winston';
import 'winston-daily-rotate-file';

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
          format.timestamp({ format: new Date().toLocaleString() }),
          format.printf((info) => {
            const appName = 'SimbirGwent';
            return `[${appName}] ${info.level} ${info.timestamp}  [${LoggerModule.name}] : ${info.message}`;
          }),
        ),
      }),
    ],
  };
}
