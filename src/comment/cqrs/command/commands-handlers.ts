import { CreateHandler } from '@app/comment/cqrs/command/create/create.handler';
import { DeleteHandler } from '@app/comment/cqrs/command/delete/delete.handler';
import { UpdateHandler } from '@app/comment/cqrs/command/update/update.handler';

export const commandsHandlers = [CreateHandler, DeleteHandler, UpdateHandler];
