import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IResponse } from './interfaces/response.interface';

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
    response.cookie('refreshToken', refresh, { httpOnly: true });
    return { access };
  }
}
