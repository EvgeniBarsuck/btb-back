import { LoginHandler } from '@app/user/cqrs/command/login/login.handler';
import { RegisterHandler } from '@app/user/cqrs/command/register/register.handler';

export const commandsHandlers = [RegisterHandler, LoginHandler];
