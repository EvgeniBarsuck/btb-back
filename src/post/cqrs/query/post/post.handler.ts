import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { PostQuery } from './post.query';
import { PostRepository } from 'src/post/database/post.repository';

@QueryHandler(PostQuery)
export class PostHandler implements IQueryHandler<PostQuery> {
  constructor(private repository: PostRepository) {}

  async execute({ postId }: PostQuery) {
    try {
      const result = await this.repository.findOneById(postId);

      return Ok(result);
    } catch (e) {
      console.log('🚀 ~ CreateHandler ~ execute ~ e:', e);
      return Err({ created: false });
    }
  }
}
