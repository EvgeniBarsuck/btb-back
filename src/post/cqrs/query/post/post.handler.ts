import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { PostQuery } from '@app/post/cqrs/query/post/post.query';
import { PostRepository } from '@app/post/database/post.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(PostQuery)
export class PostHandler implements IQueryHandler<PostQuery> {
  constructor(private repository: PostRepository) {}

  async execute({ postId }: PostQuery) {
    try {
      const result = await this.repository.findOneById(postId);

      if (!result) {
        return Err(new NotFoundException());
      }

      return Ok(result);
    } catch (e) {
      return Err({ created: false });
    }
  }
}
