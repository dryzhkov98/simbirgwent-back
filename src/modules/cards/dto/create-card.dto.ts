import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Ability } from './ability.dto';
import { Fraction, Rarity } from '@prisma/client';

export class CreateCardDto {
  @ApiProperty({
    description: 'Card name',
    type: String,
    example: 'Imposter',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Card description',
    type: String,
    example:
      'Order: Seize an enemy unit with 3 power or less.\n' +
      'This value is raised by 1 for every 4 Tactic cards in your starting deck.',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Card image',
    type: String,
    example: '0x74, 0xc3, 0xa9, 0x73, 0x74',
    required: true,
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Card power',
    type: Number,
    example: 2,
    required: true,
  })
  @IsNumber()
  power: number;

  @ApiProperty({
    description: 'Cards abilities',
    type: [Ability],
    example: [
      {
        name: 'Berserker',
        description:
          'This unit changes into a much stronger version of itself if a Mardroeme is played before or after it.',
        value: 'POWER',
      },
    ],
    required: true,
  })
  @ValidateNested({ each: true })
  @Type(() => Ability)
  abilities: Ability[];

  @ApiProperty({
    description: 'Card Rarity',
    enum: Rarity,
    example: 'EPIC',
    required: true,
  })
  @IsEnum(Rarity)
  rarity: Rarity;

  @ApiProperty({
    description: 'Card Fraction',
    enum: Fraction,
    example: 'SKEWERS',
    required: true,
  })
  @IsEnum(Fraction)
  fraction: Fraction;

  @ApiProperty({
    description: 'UUID of the deck that card belongs to',
    type: String,
    example: '7441968f-06c1-481b-b8f4-9c52b5064045',
    required: true,
  })
  @IsString()
  deckId: string;
}
