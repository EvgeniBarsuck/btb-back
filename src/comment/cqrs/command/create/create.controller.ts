import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  Res,
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
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { CreateCommentRequestBodyDto } from '@app/comment/cqrs/command/create/dto/create.request.dto';
import { CreateCommentResponseDto } from '@app/comment/cqrs/command/create/dto/create.response.dto';
import { CreateCommand } from '@app/comment/cqrs/command/create/create.command';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { User } from '@app/auth/decorators/user.decorator';

@Controller('comments')
@ApiTags('Comments')
export class CreateController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: CreateCommentRequestBodyDto,
  })
  @ApiCreatedResponse({
    type: CreateCommentResponseDto,
  })
  async create(
    @Body() body: CreateCommentRequestBodyDto,
    @User() user: { sub: string },
  ) {
    this.logger.log('info', `${CreateController.name}: Create cooment`);

    const createCommand = new CreateCommand({ ...body, userId: user.sub });

    const cretateCommandResult = await this.commandBus.execute<
      CreateCommand,
      Result<CreateCommentResponseDto, { created: false }>
    >(createCommand);

    return cretateCommandResult
      .map((val) => {
        this.logger.log(
          'info',
          `${CreateController.name}: Comment creation completed successfully`,
        );

        return val;
      })
      .mapErr((err) => {
        this.logger.error(
          `${CreateController.name}: Comment creation failed with an error: ${err}`,
        );

        throw new BadRequestException(err);
      }).val;
  }
}
