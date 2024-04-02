import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import { PostEntity } from '@app/post/database/post.entity';
import { commandsControllers } from '@app/post/cqrs/command/commands-controllers';
import { commandsHandlers } from '@app/post/cqrs/command/commands-handlers';
import { PostMapper } from '@app/post/database/post.mapper';
import { PostRepository } from '@app/post/database/post.repository';
import { queriesHandlers } from '@app/post/cqrs/query/queries-handlers';
import { queriesControllers } from '@app/post/cqrs/query/queries-controllers';

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
