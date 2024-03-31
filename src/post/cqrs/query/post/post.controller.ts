import {
  Controller,
  Get,
  Inject,
  Logger,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { PostQuery } from '@app/post/cqrs/query/post/post.query';
import { GetPostResponseDto } from '@app/post/cqrs/query/post/dto/post.response.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get(':postId')
  @ApiOkResponse({
    type: GetPostResponseDto,
  })
  async get(@Param('postId') postId: string) {
    this.logger.log('info', `${PostController.name}: Get post by id`);

    const postQuery = new PostQuery(postId);

    const postQueryResult = await this.queryBus.execute<
      PostQuery,
      Result<any, { found: false }>
    >(postQuery);

    return postQueryResult
      .map((val) => {
        this.logger.log(
          'info',
          `${PostController.name}: Get post by id completed successfully`,
        );

        return val;
      })
      .mapErr((err) => {
        this.logger.error(
          `${PostController.name}: Get post by id failed with an error: ${err}`,
        );

        throw new NotFoundException(err);
      });
  }
}
