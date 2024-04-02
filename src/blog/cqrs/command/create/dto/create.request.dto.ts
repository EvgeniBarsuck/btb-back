import { ApiProperty } from '@nestjs/swagger';
import { IsString, Max, Min } from 'class-validator';

export class CreateBlogRequestBodyDto {
  @ApiProperty({
    example: 'Travel blog',
    maxLength: 30,
    minLength: 3,
  })
  @Min(3)
  @Max(30)
  @IsString()
  public name: string;

  @ApiProperty({
    example: 'Short description about blog',
    maxLength: 200,
    minLength: 10,
  })
  @Min(10)
  @Max(200)
  @IsString()
  public shortDescription: string;

  @ApiProperty({
    example: 'Long description about blog',
    minLength: 50,
  })
  @Min(50)
  @IsString()
  public longDescription: string;
}
