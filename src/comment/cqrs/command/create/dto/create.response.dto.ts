import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseDto {
  @ApiProperty({
    example: 'faadf7b5-a3dd-4eda-b458-bd815ba451b0',
    description: 'Comment id',
  })
  public commentId: string;
}
