import { CreateHandler } from './create/create.handler';
import { DeleteHandler } from './delete/delete.handler';
import { UpdateHandler } from './update/update.handler';

export const commandsHandlers = [CreateHandler, DeleteHandler, UpdateHandler];
