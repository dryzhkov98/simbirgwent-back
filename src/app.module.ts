import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config/app-config.module';
import { AppConfig } from './config/app.config';

@Module({
  imports: [AppConfigModule.forRoot(AppConfig), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
