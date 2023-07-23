import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigModule } from 'src/config/app-config/app-config.module';
import { AppConfig } from 'src/config/app.config';

export function setupSwagger(app: INestApplication): void {
  const config = AppConfigModule.init(AppConfig);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.get<string>('NAME'))
    .setDescription(config.get<string>('DESCRIPTION'))
    .setVersion(config.get<string>('VERSION'))
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const baseUrl = config.get<string>('URL');
  const isDevMode = config.get<string>('MODE') !== 'production';
  let url;

  if (isDevMode) {
    const port = config.get<number>('PORT');
    url = 'http://' + baseUrl + ':' + port;
  } else {
    url = 'https://' + baseUrl;
  }

  const apiDocsPath = config.get<string>('API_DOCS_PATH');
  SwaggerModule.setup(apiDocsPath, app, document);

  // TODO: change to custom logger
  Logger.log(url + '/' + apiDocsPath, 'Documentation');
}
