import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { commandsControllers } from '@app/blog/cqrs/command/commands-controllers';
import { commandsHandlers } from '@app/blog/cqrs/command/commands-handlers';
import { queriesControllers } from '@app/blog/cqrs/query/queries-controllers';
import { queriesHandlers } from '@app/blog/cqrs/query/queries-handlers';
import { BlogEntity } from '@app/blog/database/blog.entity';
import { BlogMapper } from '@app/blog/database/blog.mapper';
import { BlogRepository } from '@app/blog/database/blog.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity]), CqrsModule],
  controllers: [...commandsControllers, ...queriesControllers],
  providers: [
    ...commandsHandlers,
    BlogMapper,
    BlogRepository,
    ...queriesHandlers,
  ],
})
export class BlogModule {}
