import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { HttpException, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'ts-results';

import { DeleteCommand } from '@app/post/cqrs/command/delete/delete.command';
import { PostRepository } from '@app/post/database/post.repository';
import { BlogQuery } from '@app/blog/cqrs/query/blog/blog.query';
import { Blog } from '@app/blog/domain/entity/blog.entity.domain';

@CommandHandler(DeleteCommand)
export class DeleteHandler implements ICommandHandler<DeleteCommand> {
  constructor(
    private readonly repository: PostRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute({ postId, userId, blogId }: DeleteCommand) {
    try {
      const getBlogQuery = new BlogQuery(blogId, userId);

      const getBlogQueryResult = await this.queryBus.execute<
        BlogQuery,
        Result<Blog, HttpException>
      >(getBlogQuery);

      if (getBlogQueryResult.err) {
        return Err(new NotFoundException());
      }

      await this.repository.delete(postId);

      return Ok({ deleted: true });
    } catch (e) {
      return Err({ deleted: false });
    }
  }
}
