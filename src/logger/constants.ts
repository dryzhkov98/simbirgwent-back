import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { LoggerModule } from './logger.module';


export const loggerService = LoggerModule.createLogger({
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
        format.cli({all: true, colors: {info:'green', error: 'red'}}),
        format.splat(),
        format.timestamp(),
        format.printf((info) => {
          return `${info.timestamp} ${info.level} [${LoggerModule.name}] : ${info.message}`;
        }),
      ),
    }),
  ],
});