import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { AppConfigService } from '../../config/app-config/app-config.service';
import { AppConfig } from '../../config/app.config';
import { User } from '@prisma/client';
import { ITokens } from './interfaces/tokens.interface';
import { IAccessTokenPayload } from './interfaces/access-token-payload.interface';
import { IRefreshTokenPayload } from './interfaces/refresh-token-payload.interface';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: AppConfigService<AppConfig>,
  ) {}

  async generateTokens(user: User): Promise<ITokens> {
    const [access, refresh] = await Promise.all([
      this.signAccessToken(user),
      this.signRefreshToken(user),
    ]);
    return { access, refresh };
  }

  verifyAccessToken(token: string): Promise<IAccessTokenPayload> {
    return this.jwtService.verifyAsync<IAccessTokenPayload>(token, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  verifyRefreshToken(token: string): Promise<IRefreshTokenPayload> {
    return this.jwtService.verifyAsync<IRefreshTokenPayload>(token, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
    });
  }

  private signAccessToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      { sub: user.id, role: user.role },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_TTL'),
      },
    );
  }

  private signRefreshToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      { sub: user.id },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_TTL'),
      },
    );
  }
}
