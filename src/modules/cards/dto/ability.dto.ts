import { IsString } from 'class-validator';

export class Ability {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  value: string;
}
