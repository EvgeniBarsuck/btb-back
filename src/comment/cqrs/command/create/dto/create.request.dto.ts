import { ApiProperty } from '@nestjs/swagger';
import { IsString, Max, Min } from 'class-validator';

export class CreateCommentRequestBodyDto {
  @ApiProperty({
    example: 'User message',
    maxLength: 30,
    minLength: 3,
  })
  @Min(3)
  @Max(40)
  @IsString()
  public message: string;

  @ApiProperty({
    example: '3580d988-042d-4a9c-bd98-ab170e64b572',
    minLength: 50,
  })
  @IsString()
  public postId: string;
}
