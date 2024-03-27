import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { DeleteCommand } from './delete.command';
import { BlogRepository } from 'src/blog/database/blog.repository';

@CommandHandler(DeleteCommand)
export class DeleteHandler implements ICommandHandler<DeleteCommand> {
  constructor(private repository: BlogRepository) {}

  async execute({ blogId }: DeleteCommand) {

    try {
      await this.repository.delete(blogId);

      return Ok({ deleted: true});
    } catch (e) {
      console.log("🚀 ~ CreateHandler ~ execute ~ e:", e)
      return Err({ deleted: false });
    }
  }
}
