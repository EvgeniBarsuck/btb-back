import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { GetBlogsResponseDto } from '@app/blog/cqrs/query/blogs/dto/blogs.response.dto';
import { BlogsQuery } from '@app//blog/cqrs/query/blogs/blogs.query';

@Controller('blogs')
@ApiTags('Blogs')
export class BlogsController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get()
  @ApiOkResponse({
    type: [GetBlogsResponseDto],
  })
  async blogs() {
    this.logger.log('info', 'Get blogs');

    const blogsQuery = new BlogsQuery();

    const blogQueryResult = await this.queryBus.execute<
      BlogsQuery,
      Result<GetBlogsResponseDto[], null>
    >(blogsQuery);

    return blogQueryResult.map((val) => {
      this.logger.log('info', 'Get blogs completed successfully')

      return val;
    }).val;
  }
}
