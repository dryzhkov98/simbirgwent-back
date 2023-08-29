import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { Card } from '@prisma/client';
import { UpdateCardDto } from '../dto/update-card.dto';
import {
  prepareCardDtoForCreate,
  prepareCardDtoForUpdate,
} from '../cards.utils';
import { CreateCardDto } from '../dto/create-card.dto';

@Injectable()
export class CardRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Promise<Card[]> {
    return this.databaseService.card.findMany();
  }

  findOneById(id: string): Promise<Card | null> {
    return this.databaseService.card.findUnique({ where: { id } });
  }

  create(createCardDto: CreateCardDto): Promise<Card> {
    return this.databaseService.card.create({
      data: prepareCardDtoForCreate(createCardDto),
    });
  }

  update(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    return this.databaseService.card.update({
      where: { id },
      data: prepareCardDtoForUpdate(updateCardDto),
    });
  }

  delete(id: string): Promise<Card> {
    return this.databaseService.card.delete({ where: { id } });
  }
}
