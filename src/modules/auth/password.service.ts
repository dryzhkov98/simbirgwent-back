import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { hash, verify } from 'argon2';
import { IPasswordHash } from './interfaces/password-hash.interface';
import { AppConfigService } from '../../config/app-config/app-config.service';
import { AppConfig } from '../../config/app.config';

@Injectable()
export class PasswordService {
  constructor(private readonly configService: AppConfigService<AppConfig>) {}
  async hashPassword(password: string): Promise<IPasswordHash> {
    const salt = randomBytes(this.configService.get<number>('SALT_SIZE'));
    const hashedPassword = await hash(password, { salt });
    return { salt, hashedPassword };
  }

  async compare(
    password: string,
    hashedPassword: string,
    salt: Buffer,
  ): Promise<boolean> {
    return verify(hashedPassword, password, { salt });
  }
}
