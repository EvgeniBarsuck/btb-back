import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { commandsControllers } from '@app/comment/cqrs/command/commands-controllers';
import { commandsHandlers } from '@app/comment/cqrs/command/commands-handlers';
import { queriesControllers } from '@app/comment/cqrs/query/queries-controllers';
import { queriesHandlers } from '@app/comment/cqrs/query/queries-handlers';
import { CommentEntity } from '@app/comment/database/comment.entity';
import { CommentMapper } from '@app/comment/database/comment.mapper';
import { CommentRepository } from '@app/comment/database/comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), CqrsModule],
  controllers: [...commandsControllers, ...queriesControllers],
  providers: [
    ...commandsHandlers,
    CommentMapper,
    CommentRepository,
    ...queriesHandlers,
  ],
})
export class CommentModule {}
