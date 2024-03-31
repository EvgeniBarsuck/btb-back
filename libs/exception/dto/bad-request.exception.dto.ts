import { ApiProperty } from '@nestjs/swagger';

export class BadRequestExceptionDto {
  @ApiProperty({
    example: 'Bad request',
  })
  public message: string;

  @ApiProperty({
    example: 400,
  })
  public status: number;
}
