import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { AppConfigModule } from './config/app-config/app-config.module';
import { AppConfig } from './config/app.config';
import { setupSwagger } from '@/swagger/swagger-setup';

const config = AppConfigModule.init(AppConfig);

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app, 'api');

  await app.listen(config.get<number>('PORT'));
}
bootstrap()
  .then((): void => {
    console.log(`App started on port ${config.get<number>('PORT')}`);
  })
  .catch((error: unknown): void => {
    if (error instanceof Error) throw new Error(error.message);

    console.error(error);

    process.exit(1);
  });
