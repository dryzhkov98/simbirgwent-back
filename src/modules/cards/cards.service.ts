import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { DatabaseService } from '../database/database.service';
import {
  convertToBuffer,
  convertToFraction,
  convertToRarity,
} from './cards.utils';
import { Card } from '@prisma/client';
import { INewCardData } from './interfaces/new-card-data.interface';

@Injectable()
export class CardsService {
  constructor(private readonly databaseService: DatabaseService) {}

  createCard(createCardDto: CreateCardDto): Promise<Card> {
    console.log('creating card');
    const fraction = convertToFraction(createCardDto.fraction);
    if (!fraction) {
      console.log('Invalid fraction');
      throw new BadRequestException('Invalid fraction');
    }
    const rarity = convertToRarity(createCardDto.rarity);
    if (!rarity) {
      console.log('Invalid rarity');
      throw new BadRequestException('Invalid rarity');
    }
    const image = convertToBuffer(createCardDto.image);
    if (!image) {
      console.log('Invalid image');
      throw new BadRequestException('Invalid image');
    }
    return this.databaseService.card.create({
      data: {
        ...createCardDto,
        abilities: createCardDto.abilities.map((ability) => ({ ...ability })),
        image,
        rarity,
        fraction,
      },
    });
  }

  findAllCards(): Promise<Card[]> {
    return this.databaseService.card.findMany();
  }

  async findOneCard(id: string): Promise<Card> {
    const card = await this.databaseService.card.findUnique({ where: { id } });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    return card;
  }

  async updateCard(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    const newCardData: INewCardData = {};
    const fraction = convertToFraction(updateCardDto.fraction);
    if (fraction) {
      newCardData.fraction = fraction;
    }
    const rarity = convertToRarity(updateCardDto.rarity);
    if (rarity) {
      newCardData.rarity = rarity;
    }
    const image = convertToBuffer(updateCardDto.image);
    if (image) {
      newCardData.image = image;
    }
    return this.databaseService.card.update({
      where: { id },
      data: {
        name: updateCardDto.name,
        abilities: updateCardDto?.abilities?.map((ability) => ({ ...ability })),
        description: updateCardDto.description,
        power: updateCardDto.power,
        ...newCardData,
      },
    });
  }

  removeCard(id: string): Promise<Card> {
    return this.databaseService.card.delete({ where: { id } });
  }
}
