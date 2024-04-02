import { ApiProperty } from '@nestjs/swagger';

export class CommentsResponseDto {
  @ApiProperty({
    example: '455f080c-2b9b-47a2-900e-ecd86e3c01f6',
  })
  public id: string;

  @ApiProperty({
    example: { message: 'User message' },
  })
  public props: {
    message: string;
  };

  @ApiProperty({
    example: '2024-03-28T21:44:03.559Z',
  })
  public createdAt: Date

  @ApiProperty({
    example: '2024-03-28T21:44:03.559Z',
  })
  public updatedAt: Date;
}
