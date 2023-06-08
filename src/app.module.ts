import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config/app-config.module';

@Module({
  imports: [AppConfigModule.forRoot(process.env)],
  controllers: [],
  providers: [],
})
export class AppModule {}
