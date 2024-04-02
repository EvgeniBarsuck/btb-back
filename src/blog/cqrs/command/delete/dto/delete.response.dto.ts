import { ApiProperty } from '@nestjs/swagger';

export class DeleteBlogResponseDto {
  @ApiProperty({
    example: true,
    description: 'Is deleted',
  })
  public deleted: boolean;
}
