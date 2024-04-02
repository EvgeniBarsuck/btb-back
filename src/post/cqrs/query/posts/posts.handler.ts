import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { PostsQuery } from '@app/post/cqrs/query/posts/posts.query';
import { PostRepository } from '@app/post/database/post.repository';

@QueryHandler(PostsQuery)
export class PostsHandler implements IQueryHandler<PostsQuery> {
  constructor(private repository: PostRepository) {}

  async execute() {
    try {
      const result = await this.repository.find();

      return Ok(result);
    } catch (e) {
      return Err({ found: false });
    }
  }
}
