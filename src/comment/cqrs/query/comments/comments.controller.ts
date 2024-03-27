import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Result } from 'ts-results';
import { Response } from 'express';
import { CommentsQuery } from './comments.query';

@Controller('comments')
@ApiTags('Comments')
export class CommentsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':postId')
  async get(@Res() res: Response, @Param('postId') postId: string) {
    const commentsQuery = new CommentsQuery(postId);

    const commentsQueryResult = await this.queryBus.execute<
      CommentsQuery,
      Result<any, { found: false }>
    >(commentsQuery);

    commentsQueryResult
      .map((val) => {
        return res.status(HttpStatus.OK).send(val);
      })
      .mapErr((err) => {
        return res.status(HttpStatus.BAD_REQUEST).send(err);
      });
  }
}
