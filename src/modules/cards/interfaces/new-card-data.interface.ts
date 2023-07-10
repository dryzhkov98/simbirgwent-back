import { Fraction, Rarity } from '@prisma/client';

export interface INewCardData {
  image?: Buffer;
  rarity?: Rarity;
  fraction?: Fraction;
}
