import { ApiProperty } from '@nestjs/swagger';

export class DeleteCommentResponseDto {
  @ApiProperty({
    example: true,
    description: 'Is deleted',
  })
  public deleted: boolean;
}
