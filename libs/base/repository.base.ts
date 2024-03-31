import { EntityProps, IDomainEntityBase } from './domain.entity.base';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';

export abstract class RepositoryBase<T> {
  abstract save(props: IDomainEntityBase<T>): Promise<IDomainEntityBase<T>>;
  abstract findOneById(id: string): Promise<IDomainEntityBase<T> | null>;
  abstract update(
    conditions: FindOptionsWhere<T>,
    fields: Partial<EntityProps<T>>,
  ): Promise<UpdateResult>;
  abstract delete(id: string, userId?: string): Promise<DeleteResult>;
}
