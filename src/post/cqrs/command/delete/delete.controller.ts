import { Controller, Delete, HttpStatus, Param, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { Response } from 'express';

import { DeleteResponseDto } from './dto/delete.response.dto';
import { DeleteCommand } from './delete.command';

@Controller('posts')
@ApiTags('Posts')
export class DeleteController {
  constructor(private readonly commandBus: CommandBus) {}

  @Delete(':postId')
  @ApiOkResponse({
    type: DeleteResponseDto,
  })
  async delete(@Res() res: Response, @Param('postId') postId: string) {
    const deleteCommand = new DeleteCommand({ postId });

    const deleteCommandResult = await this.commandBus.execute<
      DeleteCommand,
      Result<DeleteResponseDto, DeleteResponseDto>
    >(deleteCommand);

    deleteCommandResult
      .map((val) => {
        return res.status(HttpStatus.OK).send(val);
      })
      .mapErr((err) => {
        return res.status(HttpStatus.BAD_REQUEST).send(err);
      });
  }
}
