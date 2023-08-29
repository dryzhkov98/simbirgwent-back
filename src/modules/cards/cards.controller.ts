import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CardResponseDto } from './dto/card-response.dto';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: "Card's creation" })
  @ApiResponse({
    status: 201,
    type: CardResponseDto,
    description: 'Card has been created',
  })
  create(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsService.createCard(createCardDto);
  }

  @ApiOperation({ summary: 'Getting list of cards' })
  @ApiResponse({
    status: 200,
    type: [CardResponseDto],
    description: 'Get all cards',
  })
  @Get()
  findAll(): Promise<Card[]> {
    return this.cardsService.findAllCards();
  }

  @ApiOperation({ summary: 'Getting a card by id ' })
  @ApiResponse({
    status: 200,
    type: CardResponseDto,
    description: 'Get one card',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Card> {
    return this.cardsService.findOneCard(id);
  }

  @ApiOperation({ summary: 'Update a card by id ' })
  @ApiResponse({
    status: 200,
    type: CardResponseDto,
    description: 'Update one card',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    return this.cardsService.updateCard(id, updateCardDto);
  }

  @ApiOperation({ summary: 'Delete a card by id ' })
  @ApiResponse({
    status: 200,
    type: CardResponseDto,
    description: 'Delete one card',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Card> {
    return this.cardsService.removeCard(id);
  }
}
