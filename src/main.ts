import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap()
  .then((): void => {
    // TODO: сделать порт через динамческие строки
    console.log(`App started on port 3000`);
  })
  .catch((error: unknown): void => {
    if (error instanceof Error) throw new Error(error.message);

    console.error(error);

    process.exit(1);
  });
