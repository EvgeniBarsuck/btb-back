import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'User access token',
  })
  public accessToken: boolean;
}
