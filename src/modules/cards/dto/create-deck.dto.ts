import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeckDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  fraction: string;

  @ApiProperty()
  @IsString({ each: true })
  cards: string[];
}
