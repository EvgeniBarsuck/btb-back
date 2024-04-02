import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { UpdateCommand } from '@app/blog/cqrs/command/update/update.command';
import { BlogRepository } from '@app/blog/database/blog.repository';

@CommandHandler(UpdateCommand)
export class UpdateHandler implements ICommandHandler<UpdateCommand> {
  constructor(private repository: BlogRepository) {}

  async execute(command: UpdateCommand) {
    const { longDescription, name, shortDescription, userId, blogId } = command;

    try {
      await this.repository.update(
        { id: blogId, user: { id: userId } },
        {
          longDescription,
          name,
          shortDescription,
        },
      );

      return Ok({ updated: true});
    } catch (e) {
      return Err({ updated: false });
    }
  }
}
