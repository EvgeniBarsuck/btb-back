import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { BlogRepository } from '@app/blog/database/blog.repository';
import { BlogsQuery } from '@app/blog/cqrs/query/blogs/blogs.query';

@QueryHandler(BlogsQuery)
export class BlogsHandler implements IQueryHandler<BlogsQuery> {
  constructor(private repository: BlogRepository) {}

  async execute() {
    try {
      const result = await this.repository.find();

      return Ok(result);
    } catch (e) {
      return Err({ fetched: false });
    }
  }
}
