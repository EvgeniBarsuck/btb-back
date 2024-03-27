import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { BlogRepository } from 'src/blog/database/blog.repository';
import { BlogsQuery } from './blogs.query';

@QueryHandler(BlogsQuery)
export class BlogsHandler implements IQueryHandler<BlogsQuery> {
  constructor(private repository: BlogRepository) {}

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
