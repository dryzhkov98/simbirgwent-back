import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { hash, verify } from 'argon2';
import { IPasswordHash } from './interfaces/password-hash.interface';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<IPasswordHash> {
    const salt = randomBytes(16);
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
