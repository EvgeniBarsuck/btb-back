import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty({
    example: true,
    description: 'Result of the operation',
  })
  public created: boolean;
}
