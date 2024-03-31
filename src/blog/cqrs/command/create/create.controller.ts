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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Result } from 'ts-results';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { AuthGuard } from '@app/auth/guards/auth.guard';
import { User } from '@app/auth/decorators/user.decorator';
import { CreateBlogRequestBodyDto } from '@app/blog/cqrs/command/create/dto/create.request.dto';
import { CreateBlogResponseDto } from '@app/blog/cqrs/command/create/dto/create.response.dto';
import { CreateCommand } from '@app/blog/cqrs/command/create/create.command';
import { BadRequestExceptionDto } from '@libs/exception/dto/bad-request.exception.dto';
import { NotFoundExceptionDto } from '@libs/exception/dto/not-found.exception.dto';

@Controller('blogs')
@ApiTags('Blogs')
export class CreateController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: CreateBlogRequestBodyDto,
  })
  @ApiCreatedResponse({
    type: CreateBlogResponseDto,
  })
  @ApiBadRequestResponse({
    type: BadRequestExceptionDto,
  })
  @ApiNotFoundResponse({
    type: NotFoundExceptionDto,
  })
  async create(
    @Body() body: CreateBlogRequestBodyDto,
    @Res() res: Response,
    @User() user: { sub: string },
  ) {
    this.logger.log('info', 'Create new blog')
    const registerCommand = new CreateCommand({ ...body, userId: user.sub });

    const cretateCommandResult = await this.commandBus.execute<
      CreateCommand,
      Result<CreateBlogResponseDto, { created: false }>
    >(registerCommand);

    return cretateCommandResult
      .map((val) => {
        this.logger.log('info', 'blog creation completed successfully');
        return val;
      })
      .mapErr((err) => {
        this.logger.error('blog creation failed with an error');
        throw new BadRequestException(err);
      }).val;
  }
}
