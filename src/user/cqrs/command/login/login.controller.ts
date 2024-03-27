import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { Response } from 'express';

import { LoginRequestBodyDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { LoginCommand } from './login.command';

@Controller('users')
@ApiTags('Users')
export class LoginController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  @ApiBody({
    type: LoginRequestBodyDto,
  })
  @ApiCreatedResponse({
    type: LoginResponseDto,
  })
  async login(
    @Body() { email, password }: LoginRequestBodyDto,
    @Res() res: Response,
  ) {
    const loginCommand = new LoginCommand(email, password);

    const loginCommandResult = await this.commandBus.execute<
      LoginCommand,
      Result<LoginResponseDto, { access: false }>
    >(loginCommand);

    loginCommandResult
      .map((val) => {
        return res.status(HttpStatus.CREATED).send(val);
      })
      .mapErr((err) => {
        return res.status(HttpStatus.BAD_REQUEST).send(err);
      });
  }
}
