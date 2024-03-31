import {
  BadGatewayException,
  Body,
  Controller,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Put,
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

import { User } from '@app/auth/decorators/user.decorator';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { UpdateBlogRequestBodyDto } from '@app/blog/cqrs/command/update/dto/update.request.dto';
import { UpdateBlogResponseDto } from '@app/blog/cqrs/command/update/dto/update.response.dto';
import { UpdateCommand } from '@app/blog/cqrs/command/update/update.command';
import { BadRequestExceptionDto } from '@libs/exception/dto/bad-request.exception.dto';
import { NotFoundExceptionDto } from '@libs/exception/dto/not-found.exception.dto';

@Controller('blogs')
@ApiTags('Blogs')
export class UpdateController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Put(':blogId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateBlogRequestBodyDto,
  })
  @ApiCreatedResponse({
    type: UpdateBlogResponseDto,
  })
  @ApiBadRequestResponse({
    type: BadRequestExceptionDto,
  })
  @ApiNotFoundResponse({
    type: NotFoundExceptionDto,
  })
  async update(
    @Body() body: UpdateBlogRequestBodyDto,
    @Res() res: Response,
    @Param('blogId') blogId: string,
    @User() user,
  ) {
    this.logger.log('info', `${UpdateController.name}: Update blog`);

    const registerCommand = new UpdateCommand({
      ...body,
      blogId,
      userId: user.sub,
    });

    const updateCommandResult = await this.commandBus.execute<
      UpdateCommand,
      Result<UpdateBlogResponseDto, { updated: false }>
    >(registerCommand);

    return updateCommandResult
      .map((val) => {
        this.logger.log(
          'info',
          `${UpdateController.name}: Blog updation completed successfully`,
        );

        return val;
      })
      .mapErr((err) => {
        this.logger.error(
          `${UpdateController.name}: Blog updation failed with an error: ${err}`,
        );

        throw new BadGatewayException(err);
      }).val;
  }
}
