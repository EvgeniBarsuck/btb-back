import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { commandsControllers } from './cqrs/command/commands-controllers';
import { commandsHandlers } from './cqrs/command/commands-handlers';
import { queriesControllers } from './cqrs/query/queries-controllers';
import { queriesHandlers } from './cqrs/query/queries-handlers';
import { CommentEntity } from './database/comment.entity';
import { CommentMapper } from './database/comment.mapper';
import { CommentRepository } from './database/comment.repository';

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
