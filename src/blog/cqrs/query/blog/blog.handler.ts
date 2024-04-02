import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { BlogRepository } from '@app/blog/database/blog.repository';
import { BlogQuery } from '@app/blog/cqrs/query/blog/blog.query';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(BlogQuery)
export class BlogHandler implements IQueryHandler<BlogQuery> {
  constructor(private repository: BlogRepository) {}

  async execute({ blogId, userId }: BlogQuery) {
    try {
      const result = await this.repository.findOneById(blogId, userId);

      if (!result) {
        return Err(new NotFoundException())
      }

      return Ok(result);
    } catch (e) {
      return Err({ found: false });
    }
  }
}
