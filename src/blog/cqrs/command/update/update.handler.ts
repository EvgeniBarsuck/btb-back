import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { UpdateCommand } from './update.command';
import { Blog } from 'src/blog/domain/entity/blog.entity.domain';
import { BlogRepository } from 'src/blog/database/blog.repository';

@CommandHandler(UpdateCommand)
export class UpdateHandler implements ICommandHandler<UpdateCommand> {
  constructor(private repository: BlogRepository) {}

  async execute(command: UpdateCommand) {
    const { longDescription, name, shortDescription } = command;
    const blogEntity = Blog.create({
      longDescription,
      name,
      shortDescription,
      posts: [],
      user: '3580d988-042d-4a9c-bd98-ab170e64b572',
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
