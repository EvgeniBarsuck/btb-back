import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { Response } from 'express';
import { CreateRequestBodyDto } from './dto/create.request.dto';
import { CreateResponseDto } from './dto/create.response.dto';
import { CreateCommand } from './create.command';

@Controller('posts')
@ApiTags('Posts')
export class CreateController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiBody({
    type: CreateRequestBodyDto,
  })
  @ApiCreatedResponse({
    type: CreateResponseDto,
  })
  async create(@Body() body: CreateRequestBodyDto, @Res() res: Response) {
    const createCommand = new CreateCommand(body);

    const cretateCommandResult = await this.commandBus.execute<
      CreateCommand,
      Result<CreateResponseDto, { created: false }>
    >(createCommand);

    cretateCommandResult
      .map((val) => {
        return res.status(HttpStatus.CREATED).send(val);
      })
      .mapErr((err) => {
        return res.status(HttpStatus.BAD_REQUEST).send(err);
      });
  }
}
