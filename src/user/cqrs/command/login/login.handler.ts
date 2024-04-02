import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'ts-results';
import { HttpStatus } from '@nestjs/common';

import { LoginCommand } from '@app/user/cqrs/command/login/login.command';
import { UserRepository } from '@app/user/database/user.repository';
import { AuthService } from '@app/auth/auth.service';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private repository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute({ email, password }: LoginCommand) {
    try {
      const user = await this.repository.findOne({ where: { email } });

      if (!user || user.props.password !== password) {
        return Err({
          message: 'User not found',
          status: HttpStatus.NOT_FOUND,
        });
      }

      const accessToken = await this.authService.signIn(
        user.id,
        user.props.email,
      );

      return Ok({ accessToken: accessToken.access_token});
    } catch (e) {
      return Err({
        message: 'Server error',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
