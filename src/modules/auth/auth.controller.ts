import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { IResponse } from './interfaces/response.interface';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IResponse> {
    const { access, refresh } = await this.authService.signUp(createUserDto);
    response.cookie('refreshToken', refresh, { httpOnly: true });
    return { access };
  }
}
