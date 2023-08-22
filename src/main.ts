import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { AppConfigModule } from './config/app-config/app-config.module';
import { AppConfig } from './config/app.config';
import { setupSwagger } from '@/swagger/swagger-setup';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { LoggerModule } from './config/logger/logger.module';
import { getConfigLogger } from './config/logger/logger.config';
import { DatabaseService } from './modules/database/database.service';
import cookieParser from 'cookie-parser';

const config = AppConfigModule.init(AppConfig);

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerModule.createLogger(getConfigLogger()),
  });

  // enable shutdown hook
  const databaseService: DatabaseService = app.get(DatabaseService);
  await databaseService.enableShutdownHooks(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(cookieParser());

  app.enableVersioning({
    type: VersioningType.URI,
  });
  setupSwagger(app);

  await app.listen(config.get<number>('PORT'));
}

bootstrap()
  .then((): void => {
    console.log(`App started on port ${config.get<number>('PORT')}`);
  })
  .catch((error: unknown): void => {
    console.log(error);
    if (error instanceof Error) throw new Error(error.message);

    console.error(error);

    process.exit(1);
  });
