import {
  BadRequestException,
  Controller,
  Delete,
  Inject,
  Logger,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Result } from 'ts-results';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { DeleteBlogResponseDto } from '@app/blog/cqrs/command/delete/dto/delete.response.dto';
import { DeleteCommand } from '@app/blog/cqrs/command/delete/delete.command';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { User } from '@app/auth/decorators/user.decorator';
import { BadRequestExceptionDto } from '@libs/exception/dto/bad-request.exception.dto';
import { NotFoundExceptionDto } from '@libs/exception/dto/not-found.exception.dto';

@Controller('blogs')
@ApiTags('Blogs')
export class DeleteController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Delete(':blogId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: DeleteBlogResponseDto,
  })
  @ApiBadRequestResponse({
    type: BadRequestExceptionDto,
  })
  @ApiNotFoundResponse({
    type: NotFoundExceptionDto,
  })
  async delete(
    @Res() res: Response,
    @Param('blogId') blogId: string,
    @User() user,
  ) {
    this.logger.log('info', `${DeleteController}: Delete blog`);

    const deleteCommand = new DeleteCommand({ blogId, userId: user.sub });

    const deleteCommandResult = await this.commandBus.execute<
      DeleteCommand,
      Result<DeleteBlogResponseDto, DeleteBlogResponseDto>
    >(deleteCommand);

    return deleteCommandResult
      .map((val) => {
        this.logger.log(
          'info',
          `${DeleteController.name}: Blog deletion completed successfully`,
        );

        return val;
      })
      .mapErr((err) => {
        this.logger.error(
          `${DeleteController.name}: blog deletion failed with an error: ${err}`,
        );

        throw new BadRequestException(err);
      }).val;
  }
}
