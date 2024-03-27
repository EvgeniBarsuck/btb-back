import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { BlogEntity } from './database/blog.entity';
import { commandsControllers } from './cqrs/command/commands-controllers';
import { commandsHandlers } from './cqrs/command/commands-handlers';
import { BlogMapper } from './database/blog.mapper';
import { BlogRepository } from './database/blog.repository';
import { queriesControllers } from './cqrs/query/queries-controllers';
import { queriesHandlers } from './cqrs/query/queries-handlers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity]), CqrsModule, AuthModule],
  controllers: [...commandsControllers, ...queriesControllers],
  providers: [
    ...commandsHandlers,
    BlogMapper,
    BlogRepository,
    ...queriesHandlers,
  ],
})
export class BlogModule {}
