import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';

import { RegisterCommand } from '@app/user/cqrs/command/register/register.command';
import { UserRepository } from '@app/user/database/user.repository';
import { User } from '@app/user/domain/entity/user.entity.domain';

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
      return Err({ created: false });
    }
  }
}
