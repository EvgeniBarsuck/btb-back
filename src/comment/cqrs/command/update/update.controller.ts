import { Body, Controller, HttpStatus, Param, Put, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { Response } from 'express';

import { UpdateRequestBodyDto } from './dto/update.request.dto';
import { UpdateResponseDto } from './dto/update.response.dto';
import { UpdateCommand } from './update.command';

@Controller('comments')
@ApiTags('Comments')
export class UpdateController {
  constructor(private readonly commandBus: CommandBus) {}

  @Put(':commentId')
  @ApiBody({
    type: UpdateRequestBodyDto,
  })
  @ApiCreatedResponse({
    type: UpdateResponseDto,
  })
  async update(
    @Body() body: UpdateRequestBodyDto,
    @Res() res: Response,
    @Param('commentId') commentId: string,
  ) {
    const updateCommand = new UpdateCommand({ ...body, commentId });

    const updateCommandResult = await this.commandBus.execute<
      UpdateCommand,
      Result<UpdateResponseDto, { updated: false }>
    >(updateCommand);

    updateCommandResult
      .map((val) => {
        return res.status(HttpStatus.OK).send(val);
      })
      .mapErr((err) => {
        return res.status(HttpStatus.BAD_REQUEST).send(err);
      });
  }
}