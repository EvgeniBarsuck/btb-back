import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Logger,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Result } from 'ts-results';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { RegisterRequestBodyDto } from '@app/user/cqrs/command/register/dto/register.request.dto';
import { RegisterResponseDto } from '@app/user/cqrs/command/register/dto/register.response.dto';
import { RegisterCommand } from '@app/user/cqrs/command/register/register.command';

@Controller('users')
@ApiTags('Users')
export class RegisterController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post('register')
  @ApiBody({
    type: RegisterRequestBodyDto,
  })
  @ApiCreatedResponse({
    type: RegisterResponseDto,
  })
  async register(@Body() { email, password }: RegisterRequestBodyDto) {
    this.logger.log('info', 'Register user');

    const registerCommand = new RegisterCommand(email, password);

    const registerCommandResult = await this.commandBus.execute<
      RegisterCommand,
      Result<{ created: boolean }, { created: false }>
    >(registerCommand);

    return registerCommandResult
      .map((val) => {
        this.logger.log('info', 'User registration completed successfully')

        return val;
      })
      .mapErr((err) => {
        this.logger.error('User registration failed with an error');

        throw new BadRequestException(err);
      }).val;
  }
}
