import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { BlogRepository } from 'src/blog/database/blog.repository';
import { BlogQuery } from './blog.query';

@QueryHandler(BlogQuery)
export class BlogHandler implements IQueryHandler<BlogQuery> {
  constructor(private repository: BlogRepository) {}

  async execute({ blogId }: BlogQuery) {
    try {
      const result = await this.repository.findOneById(blogId);

      return Ok(result);
    } catch (e) {
      console.log('🚀 ~ CreateHandler ~ execute ~ e:', e);
      return Err({ created: false });
    }
  }
}
