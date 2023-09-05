import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateDeckDto } from '../decks/dto/create-deck.dto';

export class DeckResponseDto extends CreateDeckDto {
  @ApiProperty({
    description: 'Card id',
    type: String,
    example: '7441968f-06c1-481b-b8f4-9c52b5064045',
    required: true,
  })
  @IsString()
  id: string;
}
