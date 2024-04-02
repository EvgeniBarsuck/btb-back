import {
  BadRequestException,
  Controller,
  Delete,
  Inject,
  Logger,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { DeleteCommentResponseDto } from '@app/comment/cqrs/command/delete/dto/delete.response.dto';
import { DeleteCommand } from '@app/comment/cqrs/command/delete/delete.command';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { User } from '@app/auth/decorators/user.decorator';

@Controller('comments')
@ApiTags('Comments')
export class DeleteController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Delete(':commentId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: DeleteCommentResponseDto,
  })
  async delete(
    @User() user: { sub: string },
    @Param('commentId') commentId: string,
  ) {
    this.logger.log('info', 'Delete comment');

    const deleteCommand = new DeleteCommand({ commentId, userId: user.sub });

    const deleteCommandResult = await this.commandBus.execute<
      DeleteCommand,
      Result<DeleteCommentResponseDto, DeleteCommentResponseDto>
    >(deleteCommand);

    return deleteCommandResult
      .map((val) => {
        this.logger.log('info', 'Comment deletion completed successfully')

        return val;
      })
      .mapErr((err) => {
        throw new BadRequestException(err);
      }).val;
  }
}
