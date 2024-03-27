import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import { PostEntity } from './database/post.entity';
import { commandsControllers } from './cqrs/command/commands-controllers';
import { commandsHandlers } from './cqrs/command/commands-handlers';
import { PostMapper } from './database/post.mapper';
import { PostRepository } from './database/post.repository';
import { queriesHandlers } from './cqrs/query/queries-handlers';
import { queriesControllers } from './cqrs/query/queries-controllers';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), CqrsModule],
  controllers: [...commandsControllers, ...queriesControllers],
  providers: [
    ...commandsHandlers,
    PostMapper,
    PostRepository,
    ...queriesHandlers,
  ],
})
export class PostModule {}
