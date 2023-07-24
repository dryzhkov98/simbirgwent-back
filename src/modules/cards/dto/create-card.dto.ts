import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Ability } from './ability.dto';

export class CreateCardDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNumber()
  power: number;

  //@ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => Ability)
  abilities: Ability[];

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
