import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigModule } from 'src/config/app-config/app-config.module';
import { AppConfig } from 'src/config/app.config';

export function setupSwagger(app: INestApplication, path: string): void {
  const config = AppConfigModule.init(AppConfig);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.get<string>('NAME'))
    .setDescription(config.get<string>('DESCRIPTION'))
    .setVersion(config.get<string>('VERSION'))
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(path, app, document);

  // TODO: change to custom logger
  const baseUrl = config.get<string>('URL');
  const url =
    baseUrl === 'http://localhost'
      ? baseUrl + ':' + config.get<number>('PORT')
      : baseUrl;
  Logger.log(url + '/' + path, 'Documentation');
}
