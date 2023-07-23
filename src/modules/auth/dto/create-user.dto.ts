import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    nullable: true,
    description: "User's first name",
    type: String,
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    nullable: true,
    description: "User's last name",
    type: String,
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: "User's nickname",
    type: String,
    example: 'Joe_2007',
    required: true,
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    description: "User's password, at least 7 characters long",
    type: String,
    example: 'qwerty123',
    required: true,
  })
  @IsString()
  @MinLength(7)
  password: string;

  @ApiProperty({
    description: "User's age",
    type: Number,
    example: 20,
    required: true,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    description: "User's email",
    type: String,
    example: 'john.doe@gmail.com',
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;
}
