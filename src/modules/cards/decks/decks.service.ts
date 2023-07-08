import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { Deck } from '@prisma/client';
import { convertToFraction } from '../cards.utils';
import { CreateDeckDto } from '../dto/create-deck.dto';
import { UpdateDeckDto } from '../dto/update-deck.dto';
import { INewDeckData } from '../interfaces/new-deck-data.interface';

@Injectable()
export class DecksService {
  constructor(private readonly databaseService: DatabaseService) {}

  createDeck(createDeckDto: CreateDeckDto): Promise<Deck> {
    const fraction = convertToFraction(createDeckDto.fraction);
    if (!fraction) {
      throw new BadRequestException('Invalid fraction');
    }
    return this.databaseService.deck.create({
      data: {
        name: createDeckDto.name,
        description: createDeckDto.description,
        cards: { connect: createDeckDto.cards.map((id) => ({ id })) },
        fraction,
      },
    });
  }

  findAllDecks(): Promise<Deck[]> {
    return this.databaseService.deck.findMany();
  }

  async findOneDeck(id: string): Promise<Deck> {
    const deck = await this.databaseService.card.findUnique({ where: { id } });
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    return deck;
  }

  async updateDeck(id: string, updateDeckDto: UpdateDeckDto): Promise<Deck> {
    const newDeckData: INewDeckData = {};
    const fraction = convertToFraction(updateDeckDto.fraction);
    if (fraction) {
      newDeckData.fraction = fraction;
    }
    return this.databaseService.deck.update({
      where: { id },
      data: {
        name: updateDeckDto.name,
        description: updateDeckDto.description,
        cards: { connect: updateDeckDto?.cards?.map((id) => ({ id })) },
        ...newDeckData,
      },
    });
  }

  removeDeck(id: string): Promise<Deck> {
    return this.databaseService.deck.delete({ where: { id } });
  }
}
