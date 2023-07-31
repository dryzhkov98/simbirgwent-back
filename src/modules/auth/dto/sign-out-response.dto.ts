import { ApiProperty } from '@nestjs/swagger';

export class SignOutResponseDto {
  @ApiProperty({
    description: 'Success message',
    type: String,
    example: 'User logged out successfully',
    required: true,
  })
  message: string;
}
