import { CreateHandler } from '@app/post/cqrs/command/create/create.handler';
import { DeleteHandler } from '@app/post/cqrs/command/delete/delete.handler';
import { UpdateHandler } from '@app/post/cqrs/command/update/update.handler';

export const commandsHandlers = [CreateHandler, DeleteHandler, UpdateHandler];
