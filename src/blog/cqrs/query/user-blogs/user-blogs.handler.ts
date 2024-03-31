import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { BlogRepository } from '@app/blog/database/blog.repository';
import { UserBlogsQuery } from '@app/blog/cqrs/query/user-blogs/user-blogs.query';

@QueryHandler(UserBlogsQuery)
export class UserBlogsHandler implements IQueryHandler<UserBlogsQuery> {
  constructor(private repository: BlogRepository) {}

  async execute({ userId }: UserBlogsQuery) {
    try {
      const result = await this.repository.find({
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['user']
      });

      return Ok(result);
    } catch (e) {
      return Err({ fetched: false });
    }
  }
}
