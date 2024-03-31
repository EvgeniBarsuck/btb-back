import { CreateController } from '@app/post/cqrs/command/create/create.controller';
import { DeleteController } from '@app/post/cqrs/command/delete/delete.controller';
import { UpdateController } from '@app/post/cqrs/command/update/update.controller';

export const commandsControllers = [
  CreateController,
  UpdateController,
  DeleteController,
];
