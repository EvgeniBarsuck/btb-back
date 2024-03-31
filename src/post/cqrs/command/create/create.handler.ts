import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'ts-results';

import { CreateCommand } from '@app/post/cqrs/command/create/create.command';
import { Post } from '@app/post/domain/entity/post.entity.domain';
import { PostRepository } from '@app/post/database/post.repository';
import { BlogQuery } from '@app/blog/cqrs/query/blog/blog.query';
import { Blog } from '@app/blog/domain/entity/blog.entity.domain';
import { HttpException, NotFoundException } from '@nestjs/common';

@CommandHandler(CreateCommand)
export class CreateHandler implements ICommandHandler<CreateCommand> {
  constructor(
    private repository: PostRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: CreateCommand) {
    try {
      const getBlogQuery = new BlogQuery(command.blogId);

      const getBlogQueryResult = await this.queryBus.execute<
        BlogQuery,
        Result<Blog, HttpException>
      >(getBlogQuery);

      if (getBlogQueryResult.err) {
        return Err(new NotFoundException());
      }

      const { content, name, shortDescription, blogId } = command;
      const postEntity = Post.create({
        content,
        name,
        shortDescription,
        blog: blogId,
        comments: [],
      });

      const result = await this.repository.save(postEntity.getEntity());

      return Ok({ id: result.id });
    } catch (e) {
      return Err({ created: false });
    }
  }
}
