import { IAuthResponse } from '../interfaces/auth-response.interface';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto implements IAuthResponse {
  @ApiProperty({
    description: 'Access token',
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MGQyYzdiMi1lMDYwLTQ0YzctYWI4NC1mNjY2MDQ1YzM4NzIiLCJyb2xlIjoiUExBWUVSIiwiaWF0IjoxNTE2MjM5MDIyfQ.2fwynjg2bc9egcWIioiXdxPE3Om_zBqdKYJrHlBgjrU',
    required: true,
  })
  access: string;
}
