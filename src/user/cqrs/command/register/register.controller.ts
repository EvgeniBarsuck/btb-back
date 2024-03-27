import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Result } from 'ts-results';
import { Response } from 'express';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { RegisterRequestBodyDto } from './dto/register.request.dto';
import { RegisterResponseDto } from './dto/register.response.dto';
import { RegisterCommand } from './register.command';

@Controller('users')
@ApiTags('Users')
export class RegisterController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('register')
  @ApiBody({
    type: RegisterRequestBodyDto,
  })
  @ApiCreatedResponse({
    type: RegisterResponseDto,
  })
  async register(
    @Body() { email, password }: RegisterRequestBodyDto,
    @Res() res: Response,
  ) {
    const registerCommand = new RegisterCommand(email, password);

    const registerCommandResult = await this.commandBus.execute<
      RegisterCommand,
      Result<{ created: boolean }, { created: false }>
    >(registerCommand);

    registerCommandResult
      .map((val) => {
        return res.status(HttpStatus.CREATED).send(val);
      })
      .mapErr((err) => {
        return res.status(HttpStatus.BAD_REQUEST).send(err);
      });
  }
}
