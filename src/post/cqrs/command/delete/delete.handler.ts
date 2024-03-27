import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { DeleteCommand } from './delete.command';
import { PostRepository } from 'src/post/database/post.repository';

@CommandHandler(DeleteCommand)
export class DeleteHandler implements ICommandHandler<DeleteCommand> {
  constructor(private repository: PostRepository) {}

  async execute({ postId }: DeleteCommand) {

    try {
      await this.repository.delete(postId);

      return Ok({ deleted: true});
    } catch (e) {
      console.log("🚀 ~ CreateHandler ~ execute ~ e:", e)
      return Err({ deleted: false });
    }
  }
}
