import { Injectable, NotFoundException } from '@nestjs/common';
import { Deck } from '@prisma/client';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { DeckRepository } from './repositories/decks.repository';

@Injectable()
export class DecksService {
  constructor(private readonly deckRepository: DeckRepository) {}

  createDeck(createDeckDto: CreateDeckDto): Promise<Deck> {
    return this.deckRepository.create(createDeckDto);
  }

  findAllDecks(): Promise<Deck[]> {
    return this.deckRepository.findAll();
  }

  async findOneDeck(id: string): Promise<Deck> {
    const deck = await this.deckRepository.findOneById(id);
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    return deck;
  }

  async updateDeck(id: string, updateDeckDto: UpdateDeckDto): Promise<Deck> {
    return this.deckRepository.update(id, updateDeckDto);
  }

  removeDeck(id: string): Promise<Deck> {
    return this.deckRepository.delete(id);
  }
}
