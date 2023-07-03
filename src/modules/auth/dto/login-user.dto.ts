import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ nullable: true })
  @IsString()
  nicknameOrEmail: string;

  @ApiProperty()
  @IsString()
  @MinLength(7)
  password: string;
}
