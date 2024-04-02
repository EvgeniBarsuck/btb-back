import { CommentEntity } from '@app/comment/database/comment.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetPostResponseDto {
  @ApiProperty({
    example: '18059d0d-5d95-4de9-9c17-762ca9b8fb78',
  })
  public id: string;

  @ApiProperty({
    example: {
      name: 'Post name',
      shortDescription: 'Post short description',
      content: 'Content info',
      comments: [
        {
          message: 'User message',
          createdAt: '01-01-2024',
          updatedAt: '01-01-2024',
        },
      ],
    },
  })
  public props: {
    name: string;
    shortDescription: string;
    content: string;
    comments: CommentEntity[];
  };

  @ApiProperty({
    example: '01-01-2024',
  })
  createdAt: Date;
  
  @ApiProperty({
    example: '18059d0d-5d95-4de9-9c17-762ca9b8fb78',
  })
  updatedAt: Date;
}
