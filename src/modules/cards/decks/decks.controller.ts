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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeckResponseDto } from "../dto/deck-response.dto";

@ApiTags('decks')
@Controller('decks')
export class DecksController {
  constructor(private readonly cardsService: DecksService) {}

  @Post()
  @ApiOperation({ summary: "Deck's creation" })
  @ApiResponse({
    status: 201,
    type: DeckResponseDto,
    description: 'Deck has been created',
  })
  create(@Body() createDeckDto: CreateDeckDto): Promise<Deck> {
    return this.cardsService.createDeck(createDeckDto);
  }

  @Get()
  @ApiOperation({ summary: 'Getting list of decks' })
  @ApiResponse({
    status: 200,
    type: [DeckResponseDto],
    description: 'Get all decks',
  })
  findAll(): Promise<Deck[]> {
    return this.cardsService.findAllDecks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Getting a deck by id ' })
  @ApiResponse({
    status: 200,
    type: DeckResponseDto,
    description: 'Get one deck',
  })
  findOne(@Param('id') id: string): Promise<Deck> {
    return this.cardsService.findOneDeck(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a deck by id ' })
  @ApiResponse({
    status: 200,
    type: DeckResponseDto,
    description: 'Update one deck',
  })
  update(
    @Param('id') id: string,
    @Body() updateDeckDto: UpdateDeckDto,
  ): Promise<Deck> {
    return this.cardsService.updateDeck(id, updateDeckDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a deck by id ' })
  @ApiResponse({
    status: 200,
    type: DeckResponseDto,
    description: 'Delete one deck',
  })
  remove(@Param('id') id: string): Promise<Deck> {
    return this.cardsService.removeDeck(id);
  }
}
