import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from '@prisma/client';
import { isEmail } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findUserByNicknameOrEmail(nicknameOrEmail: string): Promise<User | null> {
    if (isEmail(nicknameOrEmail)) {
      return this.userRepository.findOneByEmail(nicknameOrEmail);
    }
    return this.userRepository.findOneByNickname(nicknameOrEmail);
  }
}
