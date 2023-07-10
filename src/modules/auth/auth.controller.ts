import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { IResponse } from './interfaces/response.interface';
import { Request, Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { REFRESH_TOKEN_KEY } from './auth.constants';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: "User's registration" })
  @ApiResponse({
    status: 201,
    type: AuthResponseDto,
    description: 'User has been successfully registered',
  })
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IResponse> {
    const { access, refresh } = await this.authService.signUp(createUserDto);
    response.cookie(REFRESH_TOKEN_KEY, refresh, { httpOnly: true });
    return { access };
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IResponse> {
    const { access, refresh } = await this.authService.signIn(loginUserDto);
    response.cookie(REFRESH_TOKEN_KEY, refresh, { httpOnly: true });
    return { access };
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  async refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IResponse> {
    const refreshToken = request.cookies[REFRESH_TOKEN_KEY];
    const { access, refresh } = await this.authService.refreshTokens(
      refreshToken,
    );
    response.cookie(REFRESH_TOKEN_KEY, refresh, { httpOnly: true });
    return { access };
  }
}
