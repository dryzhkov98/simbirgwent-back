import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty({
    description: "User's nickname or email",
    type: String,
    example: 'john.doe@gmail.com',
    required: true,
  })
  @IsString()
  nicknameOrEmail: string;

  @ApiProperty({
    description: "User's password, at least 7 characters long",
    type: String,
    example: 'qwerty123',
    required: true,
  })
  @IsString()
  @MinLength(7)
  password: string;
}
