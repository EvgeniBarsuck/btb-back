import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { PostsQuery } from './posts.query';
import { PostRepository } from 'src/post/database/post.repository';

@QueryHandler(PostsQuery)
export class PostsHandler implements IQueryHandler<PostsQuery> {
  constructor(private repository: PostRepository) {}

  async execute() {
    try {
      const result = await this.repository.find();

      return Ok(result);
    } catch (e) {
      console.log('🚀 ~ CreateHandler ~ execute ~ e:', e);
      return Err({ created: false });
    }
  }
}
