import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { CreateCommand } from './create.command';
import { Post } from 'src/post/domain/entity/post.entity.domain';
import { PostRepository } from 'src/post/database/post.repository';

@CommandHandler(CreateCommand)
export class CreateHandler implements ICommandHandler<CreateCommand> {
  constructor(private repository: PostRepository) {}

  async execute(command: CreateCommand) {
    const { content, name, shortDescription, blogId } = command;
    const postEntity = Post.create({
      content,
      name,
      shortDescription,
      blog: blogId,
      comments: [],
    });

    try {
      const result = await this.repository.save(postEntity.getEntity());

      return Ok({ id: result.id });
    } catch (e) {
      console.log('🚀 ~ CreateHandler ~ execute ~ e:', e);
      return Err({ created: false });
    }
  }
}
