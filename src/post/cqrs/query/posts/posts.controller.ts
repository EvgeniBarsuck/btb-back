import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { Response } from 'express';

import { PostsQuery } from './posts.query';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async get(@Res() res: Response) {
    const postsQuery = new PostsQuery();

    const postsQueryResult = await this.queryBus.execute<
      PostsQuery,
      Result<any, { found: false }>
    >(postsQuery);

    postsQueryResult
      .map((val) => {
        return res.status(HttpStatus.OK).send(val);
      })
      .mapErr((err) => {
        return res.status(HttpStatus.BAD_REQUEST).send(err);
      });
  }
}
