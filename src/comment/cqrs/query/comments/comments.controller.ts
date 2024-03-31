import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { CommentsQuery } from '@app/comment/cqrs/query/comments/comments.query';
import { CommentsResponseDto } from '@app/comment/cqrs/query/comments/dto/comments.response.dto';
import { NotFoundExceptionDto } from '@libs/exception/dto/not-found.exception.dto';

@Controller('comments')
@ApiTags('Comments')
export class CommentsController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get(':postId')
  @ApiOkResponse({
    type: [CommentsResponseDto],
  })
  @ApiNotFoundResponse({
    type: NotFoundExceptionDto,
  })
  async get(@Param('postId') postId: string) {
    this.logger.log('info', 'Get cooments');

    const commentsQuery = new CommentsQuery(postId);

    const commentsQueryResult = await this.queryBus.execute<
      CommentsQuery,
      Result<CommentsResponseDto[], { found: false }>
    >(commentsQuery);

    return commentsQueryResult
      .map((val) => {
        this.logger.log('info', 'Get comments completed successfully');

        return val;
      })
      .mapErr((err) => {
        this.logger.error('Get comments failed with an error');

        throw new BadRequestException(err);
      }).val;
  }
}
