import {
  BadRequestException,
  Controller,
  Delete,
  Inject,
  Logger,
  Param,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Result } from 'ts-results';

import { DeleteResponseDto } from '@app/post/cqrs/command/delete/dto/delete.response.dto';
import { DeleteCommand } from '@app/post/cqrs/command/delete/delete.command';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { NotFoundExceptionDto } from '@libs/exception/dto/not-found.exception.dto';
import { User } from '@app/auth/decorators/user.decorator';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('posts')
@ApiTags('Posts')
export class DeleteController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Delete(':postId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: DeleteResponseDto,
  })
  @ApiNotFoundResponse({
    type: NotFoundExceptionDto,
  })
  async delete(
    @Param('postId') postId: string,
    @User() user: { sub: string },
    @Query('blogId') blogId: string,
  ) {
    this.logger.log('info', 'Delete post');

    const deleteCommand = new DeleteCommand({
      postId,
      userId: user.sub,
      blogId,
    });

    const deleteCommandResult = await this.commandBus.execute<
      DeleteCommand,
      Result<DeleteResponseDto, DeleteResponseDto>
    >(deleteCommand);

    return deleteCommandResult
      .map((val) => {
        this.logger.log('info', 'Post deletion completed successfully')

        return val;
      })
      .mapErr((err) => {
        this.logger.error('Post deletion failed with an error');

        throw new BadRequestException(err);
      }).val;
  }
}
