import {
  Body,
  Controller,
  Inject,
  Logger,
  Param,
  Put,
  Query,
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

import { UpdateRequestBodyDto } from '@app/post/cqrs/command/update/dto/update.request.dto';
import { UpdateResponseDto } from '@app/post/cqrs/command/update/dto/update.response.dto';
import { UpdateCommand } from '@app/post/cqrs/command/update/update.command';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { User } from '@app/auth/decorators/user.decorator';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('posts')
@ApiTags('Posts')
export class UpdateController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Put(':postId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateRequestBodyDto,
  })
  @ApiCreatedResponse({
    type: UpdateResponseDto,
  })
  async update(
    @Body() body: UpdateRequestBodyDto,
    @Param('postId') postId: string,
    @Query('blogId') blogId: string,
    @User() user: { sub: string },
  ) {
    this.logger.log('info', `${UpdateController.name}: Get post by id`);

    const updateCommand = new UpdateCommand({
      ...body,
      postId,
      blogId,
      userId: user.sub,
    });

    const updateCommandResult = await this.commandBus.execute<
      UpdateCommand,
      Result<UpdateResponseDto, { updated: false }>
    >(updateCommand);

    return updateCommandResult
      .map((val) => {
        this.logger.log(
          'info',
          `${UpdateController.name}: Post updation completed successfully`,
        );

        return val;
      })
      .mapErr((err) => {
        this.logger.error(
          `${UpdateController.name}: Post updation failed with an error: ${err}`,
        );

        return err;
      }).val;
  }
}
