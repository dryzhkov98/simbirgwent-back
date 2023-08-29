import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Ability {
  @ApiProperty({
    description: 'Ability name',
    type: String,
    example: 'Berserker',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Ability description',
    type: String,
    example:
      'This unit changes into a much stronger version of itself if a Mardroeme is played before or after it.',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Ability value',
    type: String,
    example: 'POWER',
    required: true,
  })
  @IsString()
  value: string;
}
