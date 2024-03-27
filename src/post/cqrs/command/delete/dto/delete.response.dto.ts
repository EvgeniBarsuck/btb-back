import { ApiProperty } from '@nestjs/swagger';

export class DeleteResponseDto {
  @ApiProperty({
    example: true,
    description: 'Is deleted',
  })
  public deleted: boolean;
}
