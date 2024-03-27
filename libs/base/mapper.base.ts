import { EntityProps, IDomainEntityBase } from './domain.entity.base';

export abstract class Mapper<T> {
  abstract toDomainProps(props: T): IDomainEntityBase<T>;
  abstract toOrmProps(props: IDomainEntityBase<T>): T;
}
