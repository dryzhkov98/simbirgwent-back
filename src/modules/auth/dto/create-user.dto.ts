import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsString()
  @MinLength(7)
  password: string;

  @ApiProperty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;
}
