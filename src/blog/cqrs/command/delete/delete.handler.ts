import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { DeleteCommand } from '@app/blog/cqrs/command/delete/delete.command';
import { BlogRepository } from '@app/blog/database/blog.repository';

@CommandHandler(DeleteCommand)
export class DeleteHandler implements ICommandHandler<DeleteCommand> {
  constructor(private repository: BlogRepository) {}

  async execute({ blogId, userId }: DeleteCommand) {

    try {
      await this.repository.delete(blogId, userId);

      return Ok({ deleted: true});
    } catch (e) {
      return Err({ deleted: false });
    }
  }
}
