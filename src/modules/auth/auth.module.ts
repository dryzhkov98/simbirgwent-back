import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { JwtService } from './jwt.service';
import { AppConfigModule } from '../../config/app-config/app-config.module';
import { AppConfig } from '../../config/app.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule,
    AppConfigModule.forRoot(AppConfig),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
