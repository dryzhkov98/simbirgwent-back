import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { DecksService } from './decks.service';
import { Deck } from '@prisma/client';
import { CreateDeckDto } from '../dto/create-deck.dto';
import { UpdateDeckDto } from '../dto/update-deck.dto';

@Controller('decks')
export class DecksController {
  constructor(private readonly cardsService: DecksService) {}

  @Post()
  create(@Body() createDeckDto: CreateDeckDto): Promise<Deck> {
    return this.cardsService.createDeck(createDeckDto);
  }

  @Get()
  findAll(): Promise<Deck[]> {
    return this.cardsService.findAllDecks();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Deck> {
    return this.cardsService.findOneDeck(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeckDto: UpdateDeckDto,
  ): Promise<Deck> {
    return this.cardsService.updateDeck(id, updateDeckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Deck> {
    return this.cardsService.removeDeck(id);
  }
}
