import { ApiProperty } from '@nestjs/swagger';

export class GetPostsResponseDto {
  @ApiProperty({
    example: '18059d0d-5d95-4de9-9c17-762ca9b8fb78',
  })
  public id: string;

  @ApiProperty({
    example: {
      name: 'Post name',
      shortDescription: 'Post short description',
      content: 'Content info',
    },
  })
  public props: {
    name: string;
    shortDescription: string;
    content: string;
  };

  @ApiProperty({
    example: '01-01-2024',
  })
  public createdAt: Date;

  @ApiProperty({
    example: '18059d0d-5d95-4de9-9c17-762ca9b8fb78',
  })
  public updatedAt: Date;
}
