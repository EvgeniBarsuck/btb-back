import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { UpdateCommand } from './update.command';
import { PostRepository } from 'src/post/database/post.repository';

@CommandHandler(UpdateCommand)
export class UpdateHandler implements ICommandHandler<UpdateCommand> {
  constructor(private repository: PostRepository) {}

  async execute(command: UpdateCommand) {
    const { postId, content, name, shortDescription } = command;

    try {
      const result = await this.repository.update(
        { id: postId },
        { content, shortDescription, name },
      );

      return Ok({ count: result.affected });
    } catch (e) {
      console.log('🚀 ~ CreateHandler ~ execute ~ e:', e);
      return Err({ updated: false });
    }
  }
}
