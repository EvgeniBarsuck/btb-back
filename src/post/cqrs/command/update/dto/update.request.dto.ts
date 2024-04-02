import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateRequestBodyDto {
  @ApiProperty({
    example: 'Travel blog',
    maxLength: 30,
    minLength: 3,
  })
  @Min(3)
  @Max(30)
  @IsString()
  @IsOptional()
  public name?: string;

  @ApiProperty({
    example: 'Short description about blog',
    maxLength: 200,
    minLength: 10,
  })
  @Min(10)
  @Max(200)
  @IsString()
  @IsOptional()
  public shortDescription?: string;

  @ApiProperty({
    example: 'Post content',
    minLength: 50,
  })
  @Min(50)
  @IsString()
  @IsOptional()
  public contetnt?: string;
}
