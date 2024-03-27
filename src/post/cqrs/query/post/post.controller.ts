import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { Response } from 'express';

import { PostQuery } from './post.query';

@Controller('posts')
@ApiTags('Posts')
export class PostController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':postId')
  async get(@Res() res: Response, @Param('postId') postId: string) {
    const postQuery = new PostQuery(postId);

    const postQueryResult = await this.queryBus.execute<
      PostQuery,
      Result<any, { found: false }>
    >(postQuery);

    postQueryResult
      .map((val) => {
        return res.status(HttpStatus.OK).send(val);
      })
      .mapErr((err) => {
        return res.status(HttpStatus.BAD_REQUEST).send(err);
      });
  }
}
