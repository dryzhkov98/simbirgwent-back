import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from '../database/database.service';
import { JwtService } from './jwt.service';
import { PasswordService } from './password.service';
import { ITokens } from './interfaces/tokens.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<ITokens> {
    const isUserExist = await this.databaseService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (isUserExist) {
      throw new BadRequestException('User already exists.');
    }
    const { salt, hashedPassword } = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    const user = await this.databaseService.user.create({
      data: { ...createUserDto, password: hashedPassword, salt },
    });

    return this.jwtService.generateTokens(user);
  }
}
