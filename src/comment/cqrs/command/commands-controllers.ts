import { UpdateController } from '@app/comment/cqrs/command/update/update.controller';
import { CreateController } from '@app/comment/cqrs/command/create/create.controller';
import { DeleteController } from '@app/comment/cqrs/command/delete/delete.controller';

export const commandsControllers = [
  CreateController,
  UpdateController,
  DeleteController,
];
