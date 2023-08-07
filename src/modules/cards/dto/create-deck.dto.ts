import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Fraction } from '@prisma/client';

export class CreateDeckDto {
  @ApiProperty({
    description: 'Deck name',
    type: String,
    example: 'Power deck',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Deck description',
    type: String,
    example: 'This deck is super powerful',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Deck Fraction',
    type: Fraction,
    example: 'SKEWERS',
    required: true,
  })
  @IsEnum(Fraction)
  fraction: Fraction;

  @ApiProperty({
    nullable: true,
    description: 'UUIDs of cards of the deck',
    type: Array(String),
    example: [
      '7441968f-06c1-481b-b8f4-24141221dd',
      '7441968f-06c1-481b-321c-9c52b5064045',
      '7441968f-06c1-421s-b8f4-9c52b5064045',
    ],
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  cards: string[];
}
