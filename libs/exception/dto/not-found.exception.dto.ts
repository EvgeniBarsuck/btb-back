import { ApiProperty } from '@nestjs/swagger';

export class NotFoundExceptionDto {
  @ApiProperty({
    example: 'Entity not found',
  })
  public message: string;

  @ApiProperty({
    example: 400,
  })
  public status: number;
}
