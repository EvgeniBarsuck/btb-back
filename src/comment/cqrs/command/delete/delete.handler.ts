import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { DeleteCommand } from './delete.command';
import { CommentRepository } from 'src/comment/database/comment.repository';

@CommandHandler(DeleteCommand)
export class DeleteHandler implements ICommandHandler<DeleteCommand> {
  constructor(private repository: CommentRepository) {}

  async execute({ commentId }: DeleteCommand) {
    try {
      await this.repository.delete(commentId);

      return Ok({ deleted: true });
    } catch (e) {
      console.log('🚀 ~ CreateHandler ~ execute ~ e:', e);
      return Err({ deleted: false });
    }
  }
}
