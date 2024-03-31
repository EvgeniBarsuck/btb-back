import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { commandsControllers } from '@app/user/cqrs/command/commands-controllers';
import { commandsHandlers } from '@app/user/cqrs/command/commands-handlers';
import { UserRepository } from '@app/user/database/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/user/database/user.entity';
import { UserMapper } from '@app/user/database/user.mapper';
import { AuthModule } from '@app/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule, AuthModule],
  controllers: [...commandsControllers],
  providers: [...commandsHandlers, UserRepository, UserMapper],
})
export class UserModule {}
