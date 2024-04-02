import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { UpdateCommand } from '@app/comment/cqrs/command/update/update.command';
import { CommentRepository } from '@app/comment/database/comment.repository';

@CommandHandler(UpdateCommand)
export class UpdateHandler implements ICommandHandler<UpdateCommand> {
  constructor(private repository: CommentRepository) {}

  async execute(command: UpdateCommand) {
    const { commentId, message } = command;

    try {
      const result = await this.repository.update(
        { id: commentId },
        { message },
      );

      return Ok({ count: result.affected });
    } catch (e) {
      return Err({ updated: false });
    }
  }
}
