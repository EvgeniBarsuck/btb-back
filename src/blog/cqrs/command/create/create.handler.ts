import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { Blog } from 'src/blog/domain/entity/blog.entity.domain';
import { BlogRepository } from 'src/blog/database/blog.repository';
import { CreateCommand } from './create.command';

@CommandHandler(CreateCommand)
export class CreateHandler implements ICommandHandler<CreateCommand> {
  constructor(private repository: BlogRepository) {}

  async execute(command: CreateCommand) {
    const { longDescription, name, shortDescription, userId } = command;
    const blogEntity = Blog.create({
      longDescription,
      name,
      shortDescription,
      posts: [],
      user: userId,
    });

    try {
      const result = await this.repository.save(blogEntity.getEntity());

      return Ok({ id: result.id });
    } catch (e) {
      console.log("🚀 ~ CreateHandler ~ execute ~ e:", e)
      return Err({ created: false });
    }
  }
}
