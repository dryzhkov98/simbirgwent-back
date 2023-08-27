import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { Card, Deck } from '@prisma/client';
import { CreateDeckDto } from '../dto/create-deck.dto';
import { UpdateDeckDto } from '../dto/update-deck.dto';

@Injectable()
export class DeckRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Promise<Deck[]> {
    return this.databaseService.deck.findMany();
  }

  findOneById(id: string): Promise<(Deck & { cards: Card[] }) | null> {
    return this.databaseService.deck.findUnique({
      where: { id },
      include: { cards: true },
    });
  }

  create(createDeckDto: CreateDeckDto): Promise<Deck> {
    return this.databaseService.deck.create({
      data: {
        ...createDeckDto,
        cards: {
          connect: (createDeckDto.cards ?? []).map((id) => ({ id })),
        },
      },
    });
  }

  update(id: string, updateDeckDto: UpdateDeckDto): Promise<Deck> {
    return this.databaseService.deck.update({
      where: { id },
      data: {
        ...updateDeckDto,
        cards: {
          connect: (updateDeckDto.cards ?? []).map((id) => ({ id })),
        },
      },
    });
  }

  delete(id: string): Promise<Deck> {
    return this.databaseService.deck.delete({ where: { id } });
  }
}
