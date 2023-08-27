import { CreateCardDto } from './create-card.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CardResponseDto extends CreateCardDto {
  @ApiProperty({
    description: 'Card id',
    type: String,
    example: '7441968f-06c1-481b-b8f4-9c52b5064045',
    required: true,
  })
  @IsString()
  id: string;
}
