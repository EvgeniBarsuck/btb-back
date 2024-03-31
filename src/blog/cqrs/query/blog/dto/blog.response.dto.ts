import { ApiProperty } from '@nestjs/swagger';

export class GetBlogResponseDto {
  @ApiProperty({
    example: 'a2a99fa7-94d5-4d9c-aab8-75f0a665f32c',
  })
  public id: string;

  @ApiProperty({
    example: {
      longDescription: 'Long description about blog',
      name: 'Travel blog',
      shortDescription: 'Short description about blog',
    },
  })
  public props: {
    longDescription: string;
    name: string;
    shortDescription: string;
  };

  @ApiProperty({
    example: '2024-03-27T19:38:39.231Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-03-27T19:38:39.231Z',
  })
  updatedAt: Date;
}
