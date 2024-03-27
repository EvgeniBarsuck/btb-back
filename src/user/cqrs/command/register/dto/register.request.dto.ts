import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class RegisterRequestBodyDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'User email (cannot be changed)',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    example: 'Passsword123!',
    description: 'User password',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  public password: string;
}
