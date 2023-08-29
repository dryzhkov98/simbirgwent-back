import { Fraction, Rarity } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

export const convertToFraction = <T extends string | (string | undefined)>(
  value: T,
): T extends string ? Fraction : Fraction | null => {
  switch (value) {
    case Fraction.MONSTERS:
      return Fraction.MONSTERS;
    case Fraction.NILFGAARD:
      return Fraction.NILFGAARD;
    case Fraction.SKELLIGE:
      return Fraction.SKELLIGE;
    case Fraction.SKEWERS:
      return Fraction.SKEWERS;
    case Fraction.NORTHERN_KINGDOMS:
      return Fraction.NORTHERN_KINGDOMS;
    default:
      throw new BadRequestException('Invalid fraction');
  }
};

export const convertToRarity = <T extends string | (string | undefined)>(
  value: T,
): T extends string ? Rarity : Rarity | null => {
  switch (value) {
    case Rarity.EPIC:
      return Rarity.EPIC;
    case Rarity.COMMON:
      return Rarity.COMMON;
    case Rarity.RARE:
      return Rarity.RARE;
    case Rarity.LEGENDARY:
      return Rarity.LEGENDARY;
    default:
      throw new BadRequestException('Invalid rarity');
  }
};

export const convertToBuffer = <T extends string | (string | undefined)>(
  value: T,
): T extends string ? Buffer : Buffer | null => {
  if (!value) {
    throw new BadRequestException('Invalid image');
  }
  return Buffer.from(value, 'utf-8');
};
