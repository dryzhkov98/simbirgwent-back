import { IsJSON, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  image: string;

  @ApiProperty()
  @IsNumber()
  power: number;

  @ApiProperty()
  @IsJSON()
  abilities: object;

  @ApiProperty()
  @IsString()
  rarity: string;

  @ApiProperty()
  @IsString()
  fraction: string;

  @ApiProperty()
  @IsString()
  deckId: string;
}
