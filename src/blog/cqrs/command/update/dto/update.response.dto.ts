import { ApiProperty } from '@nestjs/swagger';

export class UpdateResponseDto {
  @ApiProperty({
    example: 'faadf7b5-a3dd-4eda-b458-bd815ba451b0',
    description: 'Blog id',
  })
  public blogId: string;
}
