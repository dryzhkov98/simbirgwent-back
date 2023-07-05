import { Fractions, Rarities } from '@prisma/client';

export const convertToFraction = (
  value: string | undefined,
): Fractions | null => {
  switch (value) {
    case Fractions.MONSTERS:
      return Fractions.MONSTERS;
    case Fractions.NILFGAARD:
      return Fractions.NILFGAARD;
    case Fractions.SKELLIGE:
      return Fractions.SKELLIGE;
    case Fractions.SKEWERS:
      return Fractions.SKEWERS;
    case Fractions.NORTHERN_KINGDOMS:
      return Fractions.NORTHERN_KINGDOMS;
    default:
      return null;
  }
};

export const convertToRarity = (value: string | undefined): Rarities | null => {
  switch (value) {
    case Rarities.EPIC:
      return Rarities.EPIC;
    case Rarities.COMMON:
      return Rarities.COMMON;
    case Rarities.RARE:
      return Rarities.RARE;
    case Rarities.LEGENDARY:
      return Rarities.LEGENDARY;
    default:
      return null;
  }
};

export const convertToBuffer = (value: string | undefined): Buffer | null => {
  if (!value){
    return null;
  }
  return Buffer.from(value, 'utf-8');
};
