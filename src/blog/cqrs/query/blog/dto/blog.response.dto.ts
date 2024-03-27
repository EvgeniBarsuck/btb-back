import { ApiProperty } from '@nestjs/swagger';

export class BlogResponseDto {
  @ApiProperty({
    example: 'Travel blog',
    maxLength: 30,
    minLength: 3,
  })
  public name?: string;

  @ApiProperty({
    example: 'Short description about blog',
    maxLength: 200,
    minLength: 10,
  })
  public shortDescription?: string;

  @ApiProperty({
    example: 'Long description about blog',
    minLength: 50,
  })
  public longDescription?: string;
}
