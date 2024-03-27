import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';
import { CommentsQuery } from './comments.query';
import { CommentRepository } from 'src/comment/database/comment.repository';

@QueryHandler(CommentsQuery)
export class CommentsHandler implements IQueryHandler<CommentsQuery> {
  constructor(private repository: CommentRepository) {}

  async execute({ postId }: CommentsQuery) {
    try {
      const result = await this.repository.findPostComments(postId);

      return Ok(result);
    } catch (e) {
      console.log('🚀 ~ CreateHandler ~ execute ~ e:', e);
      return Err({ created: false });
    }
  }
}
