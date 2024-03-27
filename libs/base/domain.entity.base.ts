export type EntityProps<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

export interface IDomainEntityBase<T> {
  id: string;
  props: EntityProps<T>;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class DomainEntityBase<T extends EntityProps<T>> {
  static create<T extends EntityProps<T>, Entity>(
    props: EntityProps<T>,
  ): Entity {
    throw new Error('Method not implemented');
  }

  abstract getEntity(): IDomainEntityBase<T>;
}
