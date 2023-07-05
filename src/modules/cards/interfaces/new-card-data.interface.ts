import { Fractions, Rarities } from '@prisma/client';

export interface INewCardData {
  image?: Buffer;
  rarity?: Rarities;
  fraction?: Fractions;
}
