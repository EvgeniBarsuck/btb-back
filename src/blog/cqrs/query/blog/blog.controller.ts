import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { Response } from 'express';

import { BlogResponseDto } from './dto/blog.response.dto';
import { BlogQuery } from './blog.query';

@Controller('blogs')
@ApiTags('Blogs')
export class BlogController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':blogId')
  @ApiOkResponse({
    type: BlogResponseDto,
  })
  async update(@Res() res: Response, @Param('blogId') blogId: string) {
    const blogQuery = new BlogQuery(blogId);

    const blogQueryResult = await this.queryBus.execute<
      BlogQuery,
      Result<BlogResponseDto, { found: false }>
    >(blogQuery);

    blogQueryResult
      .map((val) => {
        return res.status(HttpStatus.OK).send(val);
      })
      .mapErr((err) => {
        return res.status(HttpStatus.BAD_REQUEST).send(err);
      });
  }
}
