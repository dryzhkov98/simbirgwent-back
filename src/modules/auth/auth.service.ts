import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from './jwt.service';
import { PasswordService } from './password.service';
import { ITokens } from './interfaces/tokens.interface';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UserRepository } from '../user/repositories/user.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<ITokens> {
    const isUserExist = await this.userRepository.findOneByEmail(
      createUserDto.email,
    );

    if (isUserExist) {
      throw new BadRequestException('User already exists.');
    }
    const { salt, hashedPassword } = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      salt,
    });

    return this.jwtService.generateTokens(user);
  }

  async signIn(signInUserDto: SignInUserDto): Promise<ITokens> {
    const user = await this.userService.findUserByNicknameOrEmail(
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
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new BadRequestException('Invalid refreshToken.');
    }

    return this.jwtService.generateTokens(user);
  }
}
