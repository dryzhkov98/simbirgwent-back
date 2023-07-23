import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from '../database/database.service';
import { JwtService } from './jwt.service';
import { PasswordService } from './password.service';
import { ITokens } from './interfaces/tokens.interface';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { User } from '@prisma/client';
import { isEmail } from 'class-validator';


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
  
  async signIn(signInUserDto: SignInUserDto): Promise<ITokens> {
    const user = await this.findUserByNicknameOrEmail(
      signInUserDto.nicknameOrEmail,
    );
    if (!user) {
      throw new BadRequestException('Wrong login or password, try again.');
    }

    const isPasswordCorrect = await this.passwordService.compare(
      signInUserDto.password,
      user.password,
      user.salt,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException('Wrong login or password, try again.');
    }

    return this.jwtService.generateTokens(user);
  }

  async refreshTokens(refreshToken: string | undefined): Promise<ITokens> {
    if (!refreshToken) {
      throw new BadRequestException('Invalid refreshToken.');
    }

    const { sub: id } = await this.jwtService.verifyRefreshToken(refreshToken);
    const user = await this.databaseService.user.findUnique({ where: { id } });

    if (!user) {
      throw new BadRequestException('Invalid refreshToken.');
    }

    return this.jwtService.generateTokens(user);
  }

  private findUserByNicknameOrEmail(
    nicknameOrEmail: string,
  ): Promise<User | null> {
    if (isEmail(nicknameOrEmail)) {
      return this.databaseService.user.findUnique({
        where: { email: nicknameOrEmail },
      });
    }
    return this.databaseService.user.findUnique({
      where: { nickname: nicknameOrEmail },
    });
  }
}
