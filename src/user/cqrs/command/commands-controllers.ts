import { LoginController } from '@app/user/cqrs/command/login/login.controller';
import { RegisterController } from '@app/user/cqrs/command/register/register.controller';

export const commandsControllers = [RegisterController, LoginController];
