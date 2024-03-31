import {
  Body,
  Controller,
  HttpException,
  Inject,
  Logger,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { LoginRequestBodyDto } from '@app/user/cqrs/command/login/dto/login.request.dto';
import { LoginResponseDto } from '@app/user/cqrs/command/login/dto/login.response.dto';
import { LoginCommand } from '@app/user/cqrs/command/login/login.command';

@Controller('users')
@ApiTags('Users')
export class LoginController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post('login')
  @ApiBody({
    type: LoginRequestBodyDto,
  })
  @ApiCreatedResponse({
    type: LoginResponseDto,
  })
  async login(@Body() { email, password }: LoginRequestBodyDto) {
    this.logger.log('info', 'Login user');

    const loginCommand = new LoginCommand(email, password);

    const loginCommandResult = await this.commandBus.execute<
      LoginCommand,
      Result<LoginResponseDto, { message: string; status: number }>
    >(loginCommand);

    return loginCommandResult
      .map((val) => {
        this.logger.log('info', 'Login user completed successfully')

        return val;
      })
      .mapErr((err) => {
        this.logger.error('Login user failed with an error');

        throw new HttpException(err, err.status);
      }).val;
  }
}
