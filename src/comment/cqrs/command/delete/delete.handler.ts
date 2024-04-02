import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { DeleteCommand } from '@app/comment/cqrs/command/delete/delete.command';
import { CommentRepository } from '@app/comment/database/comment.repository';

@CommandHandler(DeleteCommand)
export class DeleteHandler implements ICommandHandler<DeleteCommand> {
  constructor(private repository: CommentRepository) {}

  async execute({ commentId, userId }: DeleteCommand) {
    try {
      await this.repository.delete(commentId, userId);

      return Ok({ deleted: true });
    } catch (e) {
      return Err({ deleted: false });
    }
  }
}
