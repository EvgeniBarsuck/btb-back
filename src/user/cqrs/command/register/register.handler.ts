import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { RegisterCommand } from './register.command';
import { UserRepository } from '../../../database/user.repository';
import { User } from '../../../domain/entity/user.entity.domain';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(private repository: UserRepository) {}

  async execute(command: RegisterCommand) {
    const { email, password } = command;
    const userEntity = User.create({
      comments: [],
      email,
      password,
      name: null,
      blogs: [],
    });

    try {
      await this.repository.save(userEntity.getEntity());

      return Ok({ created: true });
    } catch (e) {
      console.log('🚀 ~ RegisterHandler ~ execute ~ e:', e);
      return Err({ created: false });
    }
  }
}
