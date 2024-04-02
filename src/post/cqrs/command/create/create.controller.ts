import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Logger,
  Post,
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

import { CreateRequestBodyDto } from '@app/post/cqrs/command/create/dto/create.request.dto';
import { CreateResponseDto } from '@app/post/cqrs/command/create/dto/create.response.dto';
import { CreateCommand } from '@app/post/cqrs/command/create/create.command';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { User } from '@app/auth/decorators/user.decorator';

@Controller('posts')
@ApiTags('Posts')
export class CreateController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: CreateRequestBodyDto,
  })
  @ApiCreatedResponse({
    type: CreateResponseDto,
  })
  async create(
    @Body() body: CreateRequestBodyDto,
    @User() user: { sub: string },
  ) {
    this.logger.log('info', `${CreateController.name}: Create post`);

    const createCommand = new CreateCommand({ ...body, userId: user.sub });

    const cretateCommandResult = await this.commandBus.execute<
      CreateCommand,
      Result<CreateResponseDto, { created: false }>
    >(createCommand);

    return cretateCommandResult
      .map((val) => {
        this.logger.log(
          'info',
          `${CreateController.name}: Post creation completed successfully`,
        );

        return val;
      })
      .mapErr((err) => {
        this.logger.error(
          `${CreateController.name}: Post creation failed with an error': ${err}`,
        );

        throw new BadRequestException(err);
      }).val;
  }
}
