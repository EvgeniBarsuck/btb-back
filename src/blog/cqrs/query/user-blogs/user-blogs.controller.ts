import { Controller, Get, Inject, Logger, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { BlogsQuery } from '@app//blog/cqrs/query/blogs/blogs.query';
import { User } from '@app/auth/decorators/user.decorator';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { UserBlogsQuery } from '@app/blog/cqrs/query/user-blogs/user-blogs.query';
import { GetUserBlogsResponseDto } from '@app/blog/cqrs/query/user-blogs/dto/user-blogs.response.dto';

@Controller('blogs')
@ApiTags('Blogs')
export class UserBlogsController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('user')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: [GetUserBlogsResponseDto],
  })
  async userBlogs(@User() user: { sub: string }) {
    this.logger.log('info', 'Get user blogs');

    const blogsQuery = new UserBlogsQuery({ userId: user.sub });

    const userBlogQueryResult = await this.queryBus.execute<
      BlogsQuery,
      Result<GetUserBlogsResponseDto[], null>
    >(blogsQuery);

    return userBlogQueryResult.map((val) => {
      this.logger.log('info', 'Get user blogs completed successfully');

      return val;
    }).val;
  }
}
