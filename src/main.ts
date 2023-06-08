import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigModule } from './config/app-config/app-config.module';

async function bootstrap() {
  const config = AppConfigModule.init(process.env);
  console.log(config.DATABASE);
  console.log(config.DB_NAME);
  console.log(config.DB_PASSWORD);
  console.log(config.DB_USER);
  console.log(config.NAME);
  console.log(config.PORT);
  console.log(config.URL);
  console.log(config.VERSION);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
