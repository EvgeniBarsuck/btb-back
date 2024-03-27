import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { CreateCommand } from './create.command';
import { Comment } from 'src/comment/domain/entity/comment.entity.domain';
import { CommentRepository } from 'src/comment/database/comment.repository';

@CommandHandler(CreateCommand)
export class CreateHandler implements ICommandHandler<CreateCommand> {
  constructor(private repository: CommentRepository) {}

  async execute(command: CreateCommand) {
    const { message, postId, userId } = command;
    const postEntity = Comment.create({
      message,
      post: postId,
      users: [userId],
    });

    try {
      const result = await this.repository.save(postEntity.getEntity());

      return Ok({ id: result.id });
    } catch (e) {
      console.log('🚀 ~ CreateHandler ~ execute ~ e:', e);
      return Err({ created: false });
    }
  }
}
