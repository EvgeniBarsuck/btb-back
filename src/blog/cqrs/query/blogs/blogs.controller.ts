import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { Response } from 'express';

import { BlogResponseDto } from './dto/blogs.response.dto';
import { BlogsQuery } from './blogs.query';

@Controller('blogs')
@ApiTags('Blogs')
export class BlogsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({
    type: [BlogResponseDto],
  })
  async blogs(@Res() res: Response) {
    const blogsQuery = new BlogsQuery();

    const blogQueryResult = await this.queryBus.execute<
      BlogsQuery,
      Result<BlogResponseDto[], null>
    >(blogsQuery);

    blogQueryResult.map((val) => {
      return res.status(HttpStatus.OK).send(val);
    });
  }
}
