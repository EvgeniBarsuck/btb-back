import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Logger,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Result } from 'ts-results';

import { UpdateCommentRequestBodyDto } from '@app/comment/cqrs/command/update/dto/update.request.dto';
import { UpdateResponseDto } from '@app/comment/cqrs/command/update/dto/update.response.dto';
import { UpdateCommand } from '@app/comment/cqrs/command/update/update.command';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { User } from '@app/auth/decorators/user.decorator';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('comments')
@ApiTags('Comments')
export class UpdateController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Put(':commentId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateCommentRequestBodyDto,
  })
  @ApiCreatedResponse({
    type: UpdateResponseDto,
  })
  async update(
    @Body() body: UpdateCommentRequestBodyDto,
    @Param('commentId') commentId: string,
    @User() user: { sub: string },
  ) {
    this.logger.log('info', 'Update comment');

    const updateCommand = new UpdateCommand({
      ...body,
      commentId,
      userId: user.sub,
    });

    const updateCommandResult = await this.commandBus.execute<
      UpdateCommand,
      Result<UpdateResponseDto, { updated: false }>
    >(updateCommand);

    return updateCommandResult
      .map((val) => {
        this.logger.log('info', 'Comment updation completed successfully')

        return val;
      })
      .mapErr((err) => {
        this.logger.error('Comment updation failed with an error');

        throw new BadRequestException(err);
      });
  }
}
