import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { commandsControllers } from './cqrs/command/commands-controllers';
import { commandsHandlers } from './cqrs/command/commands-handlers';
import { UserRepository } from './database/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './database/user.entity';
import { UserMapper } from './database/user.mapper';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule, AuthModule],
  controllers: [...commandsControllers],
  providers: [...commandsHandlers, UserRepository, UserMapper],
})
export class UserModule {}
