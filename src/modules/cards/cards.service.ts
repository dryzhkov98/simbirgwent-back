import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardRepository } from './repositories/cards.repository';
import { CardResponseDto } from './dto/card-response.dto';
import { convertCardDtoFromDb } from './cards.utils';

@Injectable()
export class CardsService {
  constructor(private readonly cardRepository: CardRepository) {}

  async createCard(createCardDto: CreateCardDto): Promise<CardResponseDto> {
    const card = await this.cardRepository.create(createCardDto);
    return convertCardDtoFromDb(card);
  }

  async findAllCards(): Promise<CardResponseDto[]> {
    const cards = await this.cardRepository.findAll();
    return cards.map((c) => convertCardDtoFromDb(c));
  }

  async findOneCard(id: string): Promise<CardResponseDto> {
    const card = await this.cardRepository.findOneById(id);
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    return convertCardDtoFromDb(card);
  }

  async updateCard(
    id: string,
    updateCardDto: UpdateCardDto,
  ): Promise<CardResponseDto> {
    const card = await this.cardRepository.update(id, updateCardDto);
    return convertCardDtoFromDb(card);
  }

  async deleteCard(id: string): Promise<CardResponseDto> {
    const card = await this.cardRepository.delete(id);
    return convertCardDtoFromDb(card);
  }
}
