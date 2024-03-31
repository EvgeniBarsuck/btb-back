import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { CreateCommand } from '@app/comment/cqrs/command/create/create.command';
import { Comment } from '@app/comment/domain/entity/comment.entity.domain';
import { CommentRepository } from '@app/comment/database/comment.repository';
  
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
      return Err({ created: false });
    }
  }
}
