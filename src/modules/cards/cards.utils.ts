import { Fraction, Rarity } from '@prisma/client';

export const convertToFraction = (
  value: string | undefined,
): Fraction | null => {
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
      return null;
  }
};

export const convertToRarity = (value: string | undefined): Rarity | null => {
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
      return null;
  }
};

export const convertToBuffer = (value: string | undefined): Buffer | null => {
  if (!value) {
    return null;
  }
  return Buffer.from(value, 'utf-8');
};
