import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { UpdateCommand } from './update.command';
import { CommentRepository } from 'src/comment/database/comment.repository';

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
      console.log('🚀 ~ CreateHandler ~ execute ~ e:', e);
      return Err({ updated: false });
    }
  }
}
