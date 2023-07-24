import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { JwtService } from './jwt.service';
import { AppConfigModule } from '../../config/app-config/app-config.module';
import { AppConfig } from '../../config/app.config';

@Module({
  imports: [DatabaseModule, JwtModule, AppConfigModule.forRoot(AppConfig)],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, JwtService],
})
export class AuthModule {}
