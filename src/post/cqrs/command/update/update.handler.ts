import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'ts-results';

import { UpdateCommand } from '@app/post/cqrs/command/update/update.command';
import { PostRepository } from '@app/post/database/post.repository';
import { BlogQuery } from '@app/blog/cqrs/query/blog/blog.query';
import { Blog } from '@app/blog/domain/entity/blog.entity.domain';
import { HttpException, NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateCommand)
export class UpdateHandler implements ICommandHandler<UpdateCommand> {
  constructor(
    private repository: PostRepository,
    private queryBus: QueryBus,
  ) {}

  async execute(command: UpdateCommand) {
    const { postId, content, name, shortDescription } = command;

    try {
      const getBlogQuery = new BlogQuery(command.blogId);

      const getBlogQueryResult = await this.queryBus.execute<
        BlogQuery,
        Result<Blog, HttpException>
      >(getBlogQuery);

      if (getBlogQueryResult.err) {
        return Err(new NotFoundException());
      }

      const result = await this.repository.update(
        { id: postId },
        { content, shortDescription, name },
      );

      return Ok({ count: result.affected });
    } catch (e) {
      return Err({ updated: false });
    }
  }
}
