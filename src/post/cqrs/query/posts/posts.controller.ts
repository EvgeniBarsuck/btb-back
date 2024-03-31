import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Logger,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { PostsQuery } from '@app/post/cqrs/query/posts/posts.query';
import { GetPostsResponseDto } from '@app/post/cqrs/query/posts/dto/posts.response.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetPostsResponseDto,
  })
  async get() {
    this.logger.log('info', 'Get posts');

    const postsQuery = new PostsQuery();

    const postsQueryResult = await this.queryBus.execute<
      PostsQuery,
      Result<GetPostsResponseDto, { found: false }>
    >(postsQuery);

    return postsQueryResult
      .map((val) => {
        this.logger.log('info', 'Get posts completed successfully')

        return val;
      })
      .mapErr((err) => {
        this.logger.error('Get posts failed with an error');

        throw new BadRequestException(err);
      }).val;
  }
}
