import { Card, Prisma } from '@prisma/client';
import { UpdateCardDto } from './dto/update-card.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { CardResponseDto } from './dto/card-response.dto';
import { plainToInstance } from 'class-transformer';
import { Ability } from './dto/ability.dto';

export function prepareCardDtoForCreate(
  cardDto: CreateCardDto,
): Prisma.CardCreateInput {
  const { deckId, ...dto } = cardDto;
  return {
    ...dto,
    abilities: cardDto.abilities.map((ability) => ({ ...ability })),
    image: Buffer.from(cardDto.image),
    Deck: {
      connect: { id: deckId },
    },
  };
}

export function prepareCardDtoForUpdate(
  cardDto: UpdateCardDto,
): Prisma.CardUpdateInput {
  const { deckId, ...dto } = cardDto;
  return {
    ...dto,
    abilities: cardDto.abilities?.map((a) => ({ ...a })),
    image: cardDto.image ? Buffer.from(cardDto.image) : undefined,
    Deck: cardDto.deckId
      ? {
          connect: { id: deckId },
        }
      : undefined,
  };
}

export function convertCardDtoFromDb(card: Card): CardResponseDto {
  return <CardResponseDto>{
    ...card,
    image: card.image.toString(),
    abilities: card.abilities.map((a) => plainToInstance(Ability, a)),
  };
}
