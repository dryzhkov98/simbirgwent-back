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
import { Request, Response } from 'express';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { REFRESH_TOKEN_KEY } from './auth.constants';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignOutResponseDto } from './dto/sign-out-response.dto';

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
  ): Promise<AuthResponseDto> {
    const { access, refresh } = await this.authService.signUp(createUserDto);
    response.cookie(REFRESH_TOKEN_KEY, refresh, { httpOnly: true });
    return { access };
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @ApiOperation({ summary: "User's login" })
  @ApiResponse({
    status: 200,
    type: AuthResponseDto,
    description: 'User has been successfully logged in',
  })
  async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponseDto> {
    const { access, refresh } = await this.authService.signIn(signInUserDto);
    response.cookie(REFRESH_TOKEN_KEY, refresh, { httpOnly: true });
    return { access };
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  @ApiOperation({ summary: "User's tokens refresh" })
  @ApiResponse({
    status: 200,
    type: AuthResponseDto,
    description: 'User has successfully refreshed tokens',
  })
  async refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponseDto> {
    const refreshToken = request.cookies[REFRESH_TOKEN_KEY];
    const { access, refresh } = await this.authService.refreshTokens(
      refreshToken,
    );
    response.cookie(REFRESH_TOKEN_KEY, refresh, { httpOnly: true });
    return { access };
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-out')
  @ApiOperation({ summary: "User's sign out" })
  @ApiResponse({
    status: 200,
    type: SignOutResponseDto,
    description: 'User signed out successfully',
  })
  async signOut(
    @Res({ passthrough: true }) response: Response,
  ): Promise<SignOutResponseDto> {
    response.clearCookie(REFRESH_TOKEN_KEY, { httpOnly: true });
    return { message: 'User signed out successfully' };
  }
}
