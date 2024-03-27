import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateRequestBodyDto {
  @ApiProperty({
    example: 'User message',
    maxLength: 30,
    minLength: 3,
  })
  @Min(3)
  @Max(30)
  @IsString()
  @IsOptional()
  public message?: string;
}
